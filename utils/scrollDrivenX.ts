/**
 * Stand-in pointer x for when there is no mouse to follow (touch devices, or
 * before the first move). Maps how far `rect` has scrolled through the
 * viewport — 0 as it enters at the bottom, 1 as it leaves at the top — onto
 * 0..viewportWidth, so the element sits centred while it's mid-screen and
 * drifts as the user scrolls past.
 */
export const scrollDrivenX = (
  rect: DOMRect,
  viewportWidth: number,
  viewportHeight: number
) => {
  const progress = (viewportHeight - rect.top) / (viewportHeight + rect.height);
  return Math.min(Math.max(progress, 0), 1) * viewportWidth;
};
