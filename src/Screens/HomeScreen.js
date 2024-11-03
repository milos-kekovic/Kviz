import React, { useContext, useState } from 'react';
import { View, ImageBackground, StyleSheet } from 'react-native';
import { ThemeContext, UserContext } from '../Context';
import { ThemeInput, CustomButton } from '../Components';

const BackgroundImage = require('../../assets/background_4_home.jpg');

const HomeScreen = ({ navigation }) => {
  const { setUser } = useContext(UserContext);
  const [userName, setUserName] = useState('');

  return (
    <ImageBackground 
      source={BackgroundImage} 
      style={styles.backgroundImage} 
      resizeMode="stretch" // Set resizeMode directly here
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
          onButtonPress={() => {
            setUser(userName); // Set the user name in context
            navigation.navigate('Quiz'); // Navigate to the quiz screen
            console.log('Button pressed!')
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
