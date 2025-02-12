import React, { useContext } from 'react';
import { Text, Dimensions, StyleSheet } from 'react-native';
import { ThemeContext, Colors } from '../Context/ThemeContext';
import { fontSize as FS } from '../Constants/Dimensions';

const { fontScale } = Dimensions.get('window');

const fontFamily = {
  /*titleText: 'Yellowtail-Regular', // ✅ Match exact font file name
  popupHeaderText: 'Verdana-Bold',
  popupBodyText: 'Times New Roman',
  headerText: 'Arial-BoldMT',
  freeText: 'Verdana',
  freeTextInvert: 'Verdana',
  buttonText: 'Courier New',
  primaryButtonText: 'Georgia-Bold',
  secondaryButtonText: 'Trebuchet MS',
  errorMessage: 'Helvetica',
  subHeader: 'Gill Sans',
  link: 'Arial',
  input: 'Calibri',
  paginationOn: 'Arial-BoldMT',
  paginationOff: 'Arial',*/
  titleText: 'Yellowtail-Regular', // ✅ Match exact font file name
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

const fontSize = {
  titleText: { fontFamily: fontFamily.titleText, fontSize: FS * 10},
  popupHeaderText: { fontSize: fontScale * 20, fontWeight: 'bold' },
  popupBodyText: { fontSize: fontScale * 16 },
  headerText: { fontSize: FS * 0.6, fontWeight: 'bold' },
  freeText: { fontSize: FS * 4 },
  freeTextInvert: { fontSize: FS * 4 },
  buttonText: { fontSize: fontScale * 20, fontWeight: 'bold' },
  primaryButtonText: { fontSize: FS * 5, fontWeight: 'bold' },
  secondaryButtonText: { fontSize: FS * 4, fontWeight: 'bold' },
  errorMessage: { fontSize: fontScale * 15 },
  subHeader: { fontSize: fontScale * 14 },
  link: { fontSize: fontScale * 17 },
  input: { fontSize: fontScale * 17 },
  paginationOn: { fontSize: fontScale * 17.5 },
  paginationOff: { fontSize: fontScale * 17.5 },
};

export default function ThemeText({ type, style, onPress, children, ...rest }) {
  const { theme } = useContext(ThemeContext);

  const colors = {
    titleText: { color: theme.primaryColor },
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
  };

  return (
    <Text 
      style={[
        fontSize[type], 
        colors[type], 
        // { paddingHorizontal: 20 }, Added horizontal padding
        style
      ]}
      {...rest} 
      onPress={onPress}
    >
      {children}
    </Text>
  );
}
