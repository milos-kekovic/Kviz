import React, { useContext, useState, useCallback, useEffect } from 'react';
import { View, ImageBackground, StyleSheet, Text, ActivityIndicator, Image } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import { ThemeContext, UserContext } from '../Context';
import { ThemeInput, CustomButton, CustomPicker, ThemeText } from '../Components';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker'; // Import Picker component
import { fontSize } from '../Constants/Dimensions';
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
    <ImageBackground 
      source={BackgroundImage} 
      style={styles.backgroundImage} 
      resizeMode="stretch"
    >
    {/* Semi-transparent overlay to achieve background opacity */}
    <View style={styles.overlay} />
      <View style={{ 
        //flex: 1,
        width: '75%',
        height: '50%',
        alignItems: 'center',
        justifyContent: 'center',
        //paddingHorizontal: 10,
        backgroundColor: /*theme.primaryColor*/theme.secondaryColor, // Ensures this View has full opacity
        //borderWidth: 4, // Adjust thickness
        //borderColor: theme.primaryColor, // Border color from theme
        //borderRadius: 15, // Rounded corners for a smooth look
        shadowColor: '#000', // Optional shadow for depth
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5, // Elevation for Android shadow

        borderRadius: fontSize * 2,
        borderColor: theme.primaryColor,
        borderWidth: fontSize / 2
      }}>
        <Image source={LogoImage} style={styles.logo} resizeMode="contain" />
        <ThemeText type="titleText" style={{textAlign: 'center'}}>
          {translations.app_name}
        </ThemeText>
        <ThemeInput
          style={{ marginVertical: fontSize * 4 }}
          label="Tvoje ime in priimek"
          required={true}
          returnKeyType="done"
          blurOnSubmit={false}
          clearButtonMode="always"
          multiline={false}
          value={userName}
          placeholder={translations.first_and_last_name}
          onChangeText={(text) => setUserName(text)}
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
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Black background with 50% opacity
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: '25%',
    height: '25%',
    //marginBottom: 10, // Space between logo and title
  },
});

export default HomeScreen;
