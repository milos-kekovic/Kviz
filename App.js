import React, { useState, useContext } from 'react';
import { ImageBackground, View, Text, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import { LightTheme, UserContext, NavigationContext } from './src/Context'
import { CustomToast } from './src/Components';
import ThemeProvider from './src/ThemeProvider';
import AppNavigator from './src/AppNavigator';

const App = () => {
  const [user, setUser] = useState(null);
  const [notificationNavigation, setNotificationNavigation] = useState(false);

  return (
    <ThemeProvider>
      <UserContext.Provider value={{ user, setUser }}>
        <NavigationContext.Provider value={{ notificationNavigation, setNotificationNavigation }}>
          <NavigationContainer>
            <AppNavigator />    
            <CustomToast />
          </NavigationContainer>
        </NavigationContext.Provider>
      </UserContext.Provider>
    </ThemeProvider>
  );
};

export default App;
