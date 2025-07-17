import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  ReactNode,
} from 'react';
import { gsap } from 'gsap';
import { useReducedMotion } from './ReducedMotionContext';
import type {
  InteractionContextValue,
  MouseState,
  ScrollState,
  WindowSize,
} from '@/types/app/interaction';

const defaultMouse: MouseState = {
  x: 0,
  y: 0,
  velocityX: 0,
  velocityY: 0,
  isPressed: false,
  isDragging: false,
  hasMouseMoved: false,
  hoveredTarget: undefined,
};

const defaultScroll: ScrollState = {
  x: 0,
  y: 0,
  direction: null,
};

const defaultWindow: WindowSize = {
  width: 0,
  height: 0,
};

const InteractionContext = createContext<InteractionContextValue | undefined>(
  undefined
);

export const InteractionProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { prefersReducedMotion, setPrefersReducedMotion } = useReducedMotion();
  // Mouse state
  const mouseRef = useRef<MouseState>({ ...defaultMouse });
  const [mouse, setMouse] = useState<MouseState>({ ...defaultMouse });

  // Scroll state
  const scrollRef = useRef<ScrollState>({ ...defaultScroll });
  const [scroll, setScroll] = useState<ScrollState>({ ...defaultScroll });

  // Window size
  const [windowSize, setWindowSize] = useState<WindowSize>({
    ...defaultWindow,
  });

  // Mouse/touch event listeners (replacing GSAP Observer)
  useEffect(() => {
    if (prefersReducedMotion) return;

    let lastX = 0;
    let lastY = 0;
    let lastTime = Date.now();

    const handleMouseMove = (e: MouseEvent) => {
      const currentTime = Date.now();
      const deltaTime = currentTime - lastTime;
      const deltaX = e.clientX - lastX;
      const deltaY = e.clientY - lastY;
      
      const velocityX = deltaTime > 0 ? deltaX / deltaTime : 0;
      const velocityY = deltaTime > 0 ? deltaY / deltaTime : 0;

      mouseRef.current = {
        ...mouseRef.current,
        x: e.clientX,
        y: e.clientY,
        velocityX: velocityX * 100, // Scale to match GSAP Observer values
        velocityY: velocityY * 100,
        hasMouseMoved: true,
      };
      setMouse({ ...mouseRef.current });

      lastX = e.clientX;
      lastY = e.clientY;
      lastTime = currentTime;
    };

    const handleMouseDown = () => {
      mouseRef.current.isPressed = true;
      setMouse({ ...mouseRef.current });
    };

    const handleMouseUp = () => {
      mouseRef.current.isPressed = false;
      mouseRef.current.isDragging = false;
      setMouse({ ...mouseRef.current });
    };

    const handleDragStart = () => {
      if (mouseRef.current.isPressed) {
        mouseRef.current.isDragging = true;
        setMouse({ ...mouseRef.current });
      }
    };

    // Touch event handlers
    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        const currentTime = Date.now();
        const deltaTime = currentTime - lastTime;
        const deltaX = touch.clientX - lastX;
        const deltaY = touch.clientY - lastY;
        
        const velocityX = deltaTime > 0 ? deltaX / deltaTime : 0;
        const velocityY = deltaTime > 0 ? deltaY / deltaTime : 0;

        mouseRef.current = {
          ...mouseRef.current,
          x: touch.clientX,
          y: touch.clientY,
          velocityX: velocityX * 100,
          velocityY: velocityY * 100,
          hasMouseMoved: true,
        };
        setMouse({ ...mouseRef.current });

        lastX = touch.clientX;
        lastY = touch.clientY;
        lastTime = currentTime;
      }
    };

    const handleTouchStart = () => {
      mouseRef.current.isPressed = true;
      setMouse({ ...mouseRef.current });
    };

    const handleTouchEnd = () => {
      mouseRef.current.isPressed = false;
      mouseRef.current.isDragging = false;
      setMouse({ ...mouseRef.current });
    };

    // Add event listeners
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mousemove', handleDragStart);
    
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchstart', handleTouchStart);
    window.addEventListener('touchend', handleTouchEnd);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mousemove', handleDragStart);
      
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [prefersReducedMotion]);

  // Scroll tracking
  useEffect(() => {
    if (prefersReducedMotion) return;
    let lastScrollY = window.scrollY;
    let lastScrollX = window.scrollX;
    const handleScroll = () => {
      const x = window.scrollX;
      const y = window.scrollY;
      let direction: ScrollState['direction'] = null;
      if (y > lastScrollY) direction = 'down';
      else if (y < lastScrollY) direction = 'up';
      else if (x > lastScrollX) direction = 'right';
      else if (x < lastScrollX) direction = 'left';
      lastScrollY = y;
      lastScrollX = x;
      scrollRef.current = { x, y, direction };
      setScroll({ ...scrollRef.current });
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [prefersReducedMotion]);

  // Window size listener
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Provide setHoveredTarget to update hoveredTarget in mouse state
  const setHoveredTarget = (target: string | undefined) => {
    mouseRef.current.hoveredTarget = target;
    setMouse((prev) => ({ ...prev, hoveredTarget: target }));
  };

  // Provide context value
  const contextValue = React.useMemo(
    () => ({
      mouse,
      scroll,
      window: windowSize,
      prefersReducedMotion,
      setPrefersReducedMotion,
      setHoveredTarget,
    }),
    [mouse, scroll, windowSize, prefersReducedMotion, setPrefersReducedMotion]
  );

  return (
    <InteractionContext.Provider value={contextValue}>
      {children}
    </InteractionContext.Provider>
  );
};

export const useInteraction = () => {
  const context = useContext(InteractionContext);
  if (!context)
    throw new Error(
      'useInteraction must be used within an InteractionProvider'
    );
  return context;
};
