import React, { useContext } from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { ThemeText } from '../Components';
import { ThemeContext } from '../Context/ThemeContext';
import { useFontSize, useElementSize, useElementPadding, useBorderRadius, useBorderWidth } from '../Constants/Dimensions';

export default function CustomButton(props) {
  const { theme } = useContext(ThemeContext);
  const scaledFontSize = useFontSize(); // ✅ Get dynamic font size
  const scaledElementSize = useElementSize(); // ✅ Get dynamic element size
  const scaledElementPadding = useElementPadding(); // ✅ Get dynamic padding
  const scaledBorderRadius = useBorderRadius(); // ✅ Get dynamic element size
  const scaledBorderWidth = useBorderWidth(); // ✅ Get dynamic element size

  // Default to 'primary' button if type is missing or invalid
  const type = props.type === 'secondary' ? 'secondary' : 'primary';

  const customWidth = props?.style?.width;
  const backgroundColor = props.customBackgroundColor 
    ? props.customBackgroundColor 
    : type === 'primary' 
      ? theme.buttonBackgroundColorPrimary 
      : theme.buttonBackgroundColorSecondary;
  
  const textColor = type === 'primary' 
    ? theme.buttonTextColorPrimary 
    : theme.buttonTextColorSecondary;

  // Define styles inside the function to use hooks properly
  const dynamicStyles = StyleSheet.create({
    button: {
      paddingVertical: scaledElementPadding,
      borderRadius: scaledBorderRadius,
      alignItems: 'center',
      justifyContent: 'center',
    },
    primary: {
      padding: scaledElementPadding,
      borderRadius: scaledBorderRadius,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: backgroundColor,
      borderWidth: scaledBorderWidth,
      borderColor: theme.secondaryColor,
      shadowColor: '#000',
      shadowOffset: { width: 2, height: 2 },
      shadowOpacity: 0.3,
      shadowRadius: 4,
      elevation: 5,
    },
    secondary: {
      padding: scaledElementPadding,
      borderRadius: scaledBorderRadius,
      borderColor: theme.primaryColor,
      borderWidth: scaledBorderWidth,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: backgroundColor,
    },
  });

  return (
    <TouchableOpacity
      onPress={props.onButtonPress}
      style={[
        dynamicStyles[type], 
        customWidth ? { width: customWidth } : {},
      ]}
    >
      <ThemeText 
        type={type === 'primary' ? 'primaryButtonText' : 'secondaryButtonText'} 
        style={{ color: textColor }}
      >
        {props.text}
      </ThemeText>
    </TouchableOpacity>
  );
};
