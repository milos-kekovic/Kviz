import React, { useContext, useState } from 'react';
import { TextInput, StyleSheet, Platform, Dimensions } from 'react-native';
import { ThemeContext } from '../Context/ThemeContext';
import { fontSize as FS } from '../Constants/Dimensions';

const { width, height, fontScale } = Dimensions.get('window')

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

  // Dynamic style based on focus and required fields
  const dynamicStyles = {
    borderColor: isFocused ? theme.highlight : theme.line, // Highlighted color on focus
    borderWidth: required ? 2 : 1, // Thicker border if required
  };

  return (
    <TextInput
      onChangeText={onChangeText}
      placeholder={placeholder}
      placeholderTextColor="#A68E72" // Placeholder color
      style={[styles.input, dynamicStyles, { color: theme.primaryColor }, style]}
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

const styles = StyleSheet.create({
  input: {
    backgroundColor: '#F7F1D9',  // Light beige background color
    // Remove color from here
    padding: FS * 0.5,
    borderRadius: FS * 0.5,
    fontSize: FS * 0.6,
    fontWeight: '600',
    shadowColor: '#371C0B',  // Dark shadow color
    shadowOpacity: 0.3,
    shadowRadius: 4,
    shadowOffset: { width: 2, height: 2 },
    elevation: 3,  // Android shadow
    borderColor: '#371C0B', // Default border color
    borderWidth: 1,      // Default border width
    ...Platform.select({
      android: {
        textAlignVertical: 'top', // Align text to top for multiline on Android
      },
    }),
  },
});