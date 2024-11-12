import React, { useContext } from 'react';
import { TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { ThemeText } from '../Components';
import { ThemeContext } from '../Context/ThemeContext';
import { fontSize } from '../Constants/Dimensions';

const { width, height, fontScale } = Dimensions.get('window');

export default CustomButton = (props) => {
  const { theme } = useContext(ThemeContext);

  // Fallback to 'primary' if props.type is invalid or missing
  const type = props.type && styles[props.type] ? props.type : 'primary';
  const customWidth = props?.style?.width;
  const backgroundColor = props.customBackgroundColor 
    ? props.customBackgroundColor 
    : (type === 'primary' ? theme.buttonBackgroundColorPrimary : theme.buttonBackgroundColorSecondary);
  const textColor = type === 'primary' ? theme.buttonTextColorPrimary : theme.buttonTextColorSecondary;

  return (
    <TouchableOpacity
      onPress={props.onButtonPress}
      style={[
        styles[type],
        {
          backgroundColor: backgroundColor,
          ...(type === 'secondary' && customWidth ? { width: customWidth } : {}),
        },
      ]}
    >
      <ThemeText type={type === 'primary' ? 'primaryButtonText' : 'secondaryButtonText'} style={{ color: textColor }}>
        {props.text}
      </ThemeText>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: fontScale * 3,
    borderRadius: fontScale * 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primary: {
    padding: fontSize * 0.5,
    borderRadius: fontSize * 0.5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#371C0B',
  },
  secondary: {
    padding: fontSize * 0.5,
    borderRadius: fontSize * 0.5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#371C0B',
  },
});
