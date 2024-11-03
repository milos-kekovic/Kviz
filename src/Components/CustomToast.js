// CustomToast.js
import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Toast from 'react-native-toast-message';
import { ThemeContext } from '../Context/ThemeContext'; // Adjust the path to your ThemeContext
import { ThemeText } from '../Components';

export default CustomToast = () => {
  // Read theme context to get the current theme color
  const { theme } = useContext(ThemeContext);

  // Custom Toast Configuration
  const toastConfig = {
    info: ({ text1, props }) => (
      <View style={[styles.toastContainer, { backgroundColor: theme.buttonBackgroundColor }]}>
        <ThemeText type="popupBodyText">
        {text1}
        </ThemeText>
      </View>
    ),
  };

  return <Toast config={toastConfig} position="center" />;
};

const styles = StyleSheet.create({
  toastContainer: {
    //width: '80%',
    padding: 15,
    borderRadius: 8,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  toastText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
});
