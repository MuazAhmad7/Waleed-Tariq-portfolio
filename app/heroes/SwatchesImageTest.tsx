'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define types for the overlay context
interface OverlayContextType {
  overlayImage: string | null;
  setOverlayImage: (image: string | null) => void;
}

// Create context
const OverlayContext = createContext<OverlayContextType | undefined>(undefined);

// Provider component
interface OverlayProviderProps {
  children: ReactNode;
}

export const OverlayProvider: React.FC<OverlayProviderProps> = ({ children }) => {
  const [overlayImage, setOverlayImage] = useState<string | null>(null);

  return (
    <OverlayContext.Provider value={{ overlayImage, setOverlayImage }}>
      {children}
      {overlayImage && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center"
          onClick={() => setOverlayImage(null)}
        >
          <div className="relative max-w-4xl max-h-full p-4">
            <img 
              src={overlayImage} 
              alt="Overlay" 
              className="max-w-full max-h-full object-contain"
            />
            <button 
              className="absolute top-4 right-4 text-white text-2xl"
              onClick={() => setOverlayImage(null)}
            >
              ×
            </button>
          </div>
        </div>
      )}
    </OverlayContext.Provider>
  );
};

// Hook to use the overlay context
export const useOverlay = () => {
  const context = useContext(OverlayContext);
  if (context === undefined) {
    throw new Error('useOverlay must be used within an OverlayProvider');
  }
  return context;
};

// Main component that was being imported
export const SwatchesImageTest: React.FC = () => {
  return (
    <OverlayProvider>
      <div className="swatches-image-test">
        {/* This component can be expanded with more functionality as needed */}
        <p>Image swatch testing component</p>
      </div>
    </OverlayProvider>
  );
};