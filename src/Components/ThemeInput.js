import React, { useContext, useState } from 'react';
import { TextInput, StyleSheet, Platform, Dimensions } from 'react-native';
import { ThemeContext } from '../Context/ThemeContext';
import { useFontSize, useElementSize, useElementPadding } from '../Constants/Dimensions';

export default ThemeInput = (props) => {
  const {
    style,
    placeholder = 'Enter ...',
    label,
    multiline = false,
    numeric = false,
    required = false,
    onChangeText,
    ...rest
  } = props;

  const { theme } = useContext(ThemeContext);
  const [isFocused, setIsFocused] = useState(false);
  const scaledFontSize = useFontSize(); // ✅ Get dynamic font size
  const scaledElementSize = useElementSize(); // ✅ Get dynamic element size
  const scaledElementPadding = useElementPadding();

  // Dynamic style based on focus and required fields
  const dynamicStyles = {
    borderColor: isFocused ? theme.highlight : theme.line, // Highlighted color on focus
    borderWidth: required ? 2 : 1, // Thicker border if required
  };

  return (
    <TextInput
      key={placeholder} // ✅ Force re-render when placeholder changes
      onChangeText={onChangeText}
      placeholder={placeholder}
      placeholderTextColor={theme.placeholder} // Placeholder color
      style={
        [
          {
            textAlign: 'center',
            backgroundColor: '#F7F1D9',  // Light beige background color
            padding: scaledElementPadding,
            borderRadius: scaledFontSize * 0.2,
            borderColor: '#371C0B',
            borderWidth: scaledFontSize / 0.2,
            fontSize: scaledFontSize,
            shadowColor: '#371C0B',  // Dark shadow color
            shadowOpacity: 0.3,
            shadowRadius: 4,
            shadowOffset: { width: 2, height: 2 },
            elevation: 3
          },
          dynamicStyles,
          { color: theme.primaryColor },
          style
        ]
      }
      multiline={multiline}
      keyboardType={numeric ? 'numeric' : 'default'} // Set numeric keyboard if required
      onFocus={() => setIsFocused(true)}
      onBlur={() => {
        setIsFocused(false);
        if (props.onBlur) props.onBlur(); // Optional onBlur prop
      }}
      {...rest} // Spread other props
    />
  );
};