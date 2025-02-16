import React, { useContext, useState, useCallback, useEffect } from 'react';
import { View, ImageBackground, StyleSheet, Text, ActivityIndicator, Image, useWindowDimensions, SafeAreaView } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import { ThemeContext, UserContext } from '../Context';
import { ThemeInput, CustomButton, CustomPicker, ThemeText } from '../Components';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker'; // Import Picker component
import { useFontSize, useElementSize } from '../Constants/Dimensions';
import { languages } from '../languages'
import { useTranslation } from 'react-i18next'
import loadTranslations from '../localization/loadTranslations';
//import LogoImage from '../../assets/cokoladnica_cukrcek_inverted.png'; // Adjust the path as needed

const LogoImage = require('../../assets/cokoladnica_cukrcek_inverted.png');
const BackgroundImage = require('../../assets/chocolate-background.webp');

const MapOfInvalidStates = new Map([
  //['first_and_last_name', false],
  ['language', false]
])

const resetLeaderboard = async () => {
  await AsyncStorage.removeItem('scoreList');
  setScoreList([]);
};

const HomeScreen = ({ navigation }) => {
  const {
    user: { userName: userID, language }, setUser
  } = useContext(UserContext);
  console.log('language', language)
  console.log('languages', languages)
  const { t, i18n } = useTranslation();
  const [translations, setTranslations] = useState(null);
  //const { setUser } = useContext(UserContext);
  const { theme } = useContext(ThemeContext);
  const [userName, setUserName] = useState('');
  const [forceUpdate, setForceUpdate] = useState(true)
  const selectedLanguageCode = language ? language : i18n.language
  const [selectedLanguage, setSelectedLanguage] = useState(languages.find(obj => obj.code === selectedLanguageCode))

  const { height, width } = useWindowDimensions();
  const isPortrait = height > width;
  const scaledElementSize = useElementSize();

  // Clear the TextInput when the screen is focused
  useFocusEffect(
    useCallback(() => {
      setUserName(''); // Clear the userName input
    }, [])
  );

  useEffect(() => {
    console.log('selectedLanguage', selectedLanguage)
    i18n.changeLanguage(selectedLanguage.code)
    //getUser()
  }, [selectedLanguage])

  /*useEffect(() => {
    resetLeaderboard()
  }, [])*/

  useEffect(() => {
    const fetchData = async () => {
        const data = await loadTranslations(i18n.language); // ✅ Load correct language
        setTranslations(data);
        setUser((prevUser) => ({ ...prevUser, translations: data }));        
        console.log('data', data)
    };
    fetchData();
  }, [i18n.language]); // ✅ Reload when language changes

  if (!translations) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading translations...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
    <ImageBackground 
      source={BackgroundImage} 
      style={styles.backgroundImage} 
      resizeMode="stretch"
    >
    {/* Semi-transparent overlay to achieve background opacity */}
    <View style={[styles.container, { width: isPortrait ? '85%' : '65%', height: isPortrait ? '80%' : '75%' }]}>
        <Image source={LogoImage} style={{width: scaledElementSize * 2, height: scaledElementSize * 2}} resizeMode="contain" />
        <ThemeText type="titleText" style={{textAlign: 'center'}}>
          {translations.app_name}
        </ThemeText>
        <ThemeInput
          style={{marginVertical: '3%',
            width: '80%',}}
          label="Tvoje ime in priimek"
          required={true}
          returnKeyType="done"
          blurOnSubmit={false}
          clearButtonMode="always"
          multiline={false}
          value={userName}
          placeholder={translations.first_and_last_name}
          onChangeText={(text) => {
            if (text.length <= 50) { // ✅ Limit input to 50 characters
              setUserName(text);
            }
          }}
        />

        {/* Language Dropdown */}
        <View style={{width: '75%'}}>
          <CustomPicker
            style={{ marginVertical: 10, width: '100%' }}
            label={translations.choose_language}
            sort={false}
            selectedValue={selectedLanguage}
            onValueChange={(value, index) => {
              console.log('index --------------->', index)
              if (index != 0) {
                setSelectedLanguage(value)
                i18n.changeLanguage(value.code); // ✅ Update language globally
                console.log('value', value)
                setUser((prevUser) => ({ ...prevUser, language: value.code }));
              } else {
                if (Platform.OS === 'android') MapOfInvalidStates.set(state, true)
              }
            }}
            options={languages}
          />
        </View>

        <CustomButton
          text={translations.start_quiz}
          type="primary"
          //style={{ backgroundColor: theme.primaryColor, color: theme.secondaryColor }}
          onButtonPress={() => {
            if (userName) {
              setUser((prevUser) => ({ ...prevUser, userName }));
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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: '5%',
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#fff',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});

export default HomeScreen;
