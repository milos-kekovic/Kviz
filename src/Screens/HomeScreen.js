import React, { useContext, useState, useCallback } from 'react';
import { View, ImageBackground, StyleSheet } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import { ThemeContext, UserContext } from '../Context';
import { ThemeInput, CustomButton } from '../Components';
import AsyncStorage from '@react-native-async-storage/async-storage';

const BackgroundImage = require('../../assets/background_4_home.jpg');

const HomeScreen = ({ navigation }) => {
  const { setUser } = useContext(UserContext);
  const { theme } = useContext(ThemeContext);
  const [userName, setUserName] = useState('');

  // Clear the TextInput when the screen is focused
  useFocusEffect(
    useCallback(() => {
      setUserName(''); // Clear the userName input
    }, [])
  );

  return (
    <ImageBackground 
      source={BackgroundImage} 
      style={styles.backgroundImage} 
      resizeMode="stretch"
    >
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 10, marginTop: '15%' }}>
        <ThemeInput
          style={{ marginVertical: 7 }}
          label="Tvoje ime in priimek"
          required={true}
          returnKeyType="done"
          blurOnSubmit={false}
          clearButtonMode="always"
          multiline={false}
          value={userName}
          placeholder="Vpiši svoje ime in priimek"
          onChangeText={(text) => setUserName(text)}
        />

        <CustomButton
          text="Začni s kvizom"
          type="secondary"
          style={{ backgroundColor: theme.primaryColor, color: theme.secondaryColor }}
          onButtonPress={() => {
            if (userName) {
              setUser(userName); // Set the user name in context
              navigation.navigate('Quiz'); // Navigate to the quiz screen
              console.log('Button pressed!');
            } else {
              Toast.show({
                type: 'info',
                text1: 'Najprej vnesi svoje ime in priimek',
                visibilityTime: 2500,
              });
            }
          }}
        />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    justifyContent: 'center',
  }
});

export default HomeScreen;
