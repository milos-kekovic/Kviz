import React, { useContext } from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { ThemeText } from '../Components';
import { ThemeContext } from '../Context/ThemeContext';

export default CustomButton = (props) => {
  const { theme, toggleTheme, isDarkTheme } = useContext(ThemeContext);

  // Fallback to 'primary' if props.type is invalid or missing
  const type = props.type && styles[props.type] ? props.type : 'primary';
  const customWidth = props?.style?.width;
  const fS = props.fS;
  const disabled = props.disabled;
  const backgroundColor = props.style?.backgroundColor || theme.buttonBackgroundColor;

  return (
    <TouchableOpacity
      onPress={props.onButtonPress}
      style={[ styles.button, { backgroundColor: props.style?.backgroundColor ?? theme.buttonBackgroundColor }, props.style]}
    >
      <ThemeText type="buttonText" text={props.text} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center'
  },
});
