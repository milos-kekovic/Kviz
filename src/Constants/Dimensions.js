import { useWindowDimensions } from 'react-native';

const useScaledSize = () => {
  const { width = 375, fontScale = 1 } = useWindowDimensions(); // ✅ Default values for safety
  const baseScale = width / 375; // Base scale using iPhone X as reference

  let sizeMultiplier;
  if (width >= 2000) sizeMultiplier = 8; // Large TVs
  else if (width >= 1200) sizeMultiplier = 7; // Extra-large tablets
  else if (width >= 800) sizeMultiplier = 6; // Standard tablets
  else if (width >= 600) sizeMultiplier = 5; // Small tablets / large phones
  else if (width >= 400) sizeMultiplier = 4; // Large phones
  else if (width >= 320) sizeMultiplier = 3.5; // Regular phones
  else sizeMultiplier = 3; // Small phones

  // Ensure a minimum font size for consistency
  const scaledSize = Math.max(sizeMultiplier * baseScale * fontScale, 12);

  return scaledSize;
};

// ✅ Export separate hooks for font and element sizes
export const useFontSize = () => useScaledSize();
export const useBorderRadius = () => useScaledSize() * 0.2;
export const useBorderWidth = () => useScaledSize() * 0.1;
export const useElementSize = () => useScaledSize() * 2; // Elements should be larger
export const useElementPadding = () => useScaledSize() * 0.3; // Elements should be larger
export const useElementMargin = () => useScaledSize() * 0.4; // Elements should be larger
