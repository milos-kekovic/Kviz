import React, { useContext, useMemo } from 'react';
import { Text } from 'react-native';
import { ThemeContext, Colors } from '../Context/ThemeContext';
import { useFontSize, useElementSize } from '../Constants/Dimensions';

// Define font families
const fontFamily = {
  titleText: 'Yellowtail-Regular',
  popupHeaderText: 'Verdana-Bold',
  popupBodyText: 'Times New Roman',
  headerText: 'Arial-BoldMT',
  freeText: 'Courier New',
  freeTextInvert: 'Verdana',
  buttonText: 'Courier New',
  primaryButtonText: 'Georgia-Bold',
  secondaryButtonText: 'Trebuchet MS',
  errorMessage: 'Helvetica',
  subHeader: 'Gill Sans',
  link: 'Arial',
  input: 'Calibri',
  paginationOn: 'Arial-BoldMT',
  paginationOff: 'Arial',
};

export default function ThemeText({ type, style, onPress, children, ...rest }) {
  const { theme } = useContext(ThemeContext);
  const scaledFontSize = useFontSize(); // ✅ Get dynamic font size
  const scaledElementSize = useElementSize(); // ✅ Get dynamic element size

  // Memoized font styles
  const textStyles = useMemo(() => ({
    titleText: { fontFamily: fontFamily.titleText, fontSize: scaledFontSize * 3 }, // 🔹 Adjusted scaling
    popupHeaderText: { fontSize: scaledFontSize * 1.5, fontWeight: 'bold' },
    popupBodyText: { fontSize: scaledFontSize },
    headerText: { fontSize: scaledFontSize * 1.1, fontWeight: 'bold' },
    freeText: { fontSize: scaledFontSize },
    freeTextInvert: { fontSize: scaledFontSize },
    buttonText: { fontSize: scaledFontSize * 1.2, fontWeight: 'bold' },
    primaryButtonText: { fontSize: scaledFontSize, fontWeight: 'bold' },
    secondaryButtonText: { fontSize: scaledFontSize },
    errorMessage: { fontSize: scaledFontSize },
    subHeader: { fontSize: scaledFontSize },
    link: { fontSize: scaledFontSize, textDecorationLine: 'underline' },
    input: { fontSize: scaledFontSize },
    paginationOn: { fontSize: scaledFontSize, textDecorationLine: 'underline', fontWeight: 'bold' },
    paginationOff: { fontSize: scaledFontSize },
  }), [scaledFontSize]);

  // Memoized color styles
  const colorStyles = useMemo(() => ({
    titleText: { color: theme.secondaryColor },
    popupHeaderText: { color: theme.primaryColor },
    popupBodyText: { color: theme.primaryColor },
    headerText: { color: theme.freeTextColor },
    freeText: { color: theme.primaryColor },
    freeTextInvert: { color: theme.secondaryColor },
    buttonText: { color: theme.buttonTextColor },
    primaryButtonText: { color: theme.primaryButtonText },
    secondaryButtonText: { color: theme.secondaryButtonText },
    errorMessage: { color: Colors.red },
    subHeader: { color: theme.highlight2 },
    link: { color: Colors.blue, textDecorationLine: 'underline' },
    input: { color: theme.text },
    paginationOn: { color: theme.text, textDecorationLine: 'underline', fontWeight: 'bold' },
    paginationOff: { color: theme.subtext },
  }), [theme]);

  // 🔹 Prevents crashes if `type` is missing or invalid
  if (!type || !textStyles[type]) {
    console.error(`⚠️ ThemeText Error: Invalid or missing type -> ${type}`);
    return null;
  }

  return (
    <Text style={[textStyles[type], colorStyles[type], style]} {...rest} onPress={onPress}>
      {children}
    </Text>
  );
}
