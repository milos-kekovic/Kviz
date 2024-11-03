import { Dimensions } from 'react-native';

const { width, height, fontScale } = Dimensions.get('window');

// Base scale for finer adjustments across devices
const baseScale = width / 375;  // 375px width is the base (iPhone X)

const sizer = () => {
  if (width > 2000) {
    // Extremely large displays, like TVs or wall-mounted displays (55 inches)
    return 8 * baseScale;
  } else if (width > 1200) {
    // Extra-large tablets or large screens (e.g., 12.9" iPad Pro)
    return 7 * baseScale;
  } else if (width > 800) {
    // Standard tablets
    return 6 * baseScale;
  } else if (width > 600) {
    // Small tablets or very large phones
    return 5 * baseScale;
  } else if (width > 400) {
    // Large phones
    return 4 * baseScale;
  } else if (width > 320) {
    // Regular phones
    return 3.5 * baseScale;
  } else {
    // Small phones or older devices
    return 3 * baseScale;
  }
};

// Final font and element sizes using the scaled value
const fontSize = sizer() * fontScale;  // Adjust for system font scaling preference
const elementSize = sizer() * 2;       // Reduced element size multiplier for very compact design

export { elementSize, fontSize };
