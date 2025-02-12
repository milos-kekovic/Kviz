import React, { useEffect, useState, useContext } from 'react';
import { View, StyleSheet, ImageBackground, FlatList } from 'react-native';
import { UserContext, ThemeContext } from '../Context';
import { ThemeText, CustomButton } from '../Components';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { fontSize } from '../Constants/Dimensions';
import { useTranslation } from 'react-i18next';

const ChocolateBackground = require('../../assets/chocolate-background.webp');

const ListOfResultsScreen = ({ route, navigation }) => {
  const { user } = useContext(UserContext);
  const { theme } = useContext(ThemeContext);
  console.log('user', user)
  const { score } = route.params;
  const [scoreList, setScoreList] = useState([]);
  const { i18n } = useTranslation();
  const [translations, setTranslations] = useState(user.translations);

  useEffect(() => {
    const loadAndSaveScores = async () => {
      const storedScores = await AsyncStorage.getItem('scoreList');
      let currentScores = storedScores ? JSON.parse(storedScores) : [];

      const existingUser = currentScores.find((item) => item.user === user.userName);

      if (existingUser) {
        // Update the score only if the new score is higher
        currentScores = currentScores.map((item) =>
          item.user === user.userName ? { ...item, score: Math.max(item.score, score) } : item
        );
      } else {
        // Add new user and score to the list
        currentScores = [...currentScores, { user: user.userName, score }];
      }

      // Sort scores in descending order
      currentScores.sort((a, b) => b.score - a.score);

      await AsyncStorage.setItem('scoreList', JSON.stringify(currentScores));
      setScoreList(currentScores);
    };

    loadAndSaveScores();
  }, [user, score]);

  useEffect(() => {
    i18n.changeLanguage(user.language);
  }, [user.language]);

  useEffect(() => {
    if (!user.translations) {
      const fetchData = async () => {
        const data = await loadTranslations(i18n.language);
        setTranslations(data);
      };
      fetchData();
    } else {
      setTranslations(user.translations);
    }
  }, [user.translations, i18n.language]);

  const resetLeaderboard = async () => {
    await AsyncStorage.removeItem('scoreList');
    setScoreList([]);
  };

  const renderItem = ({ item, index }) => (
    <View style={[styles.listItem, item.user === user.userName ? styles.currentUserHighlight : null]}>
      <ThemeText type={'freeText'}>
        {`${index + 1}. ${item.user} - ${item.score.toFixed(2)}`}
      </ThemeText>
    </View>
  );

  return (
    <ImageBackground source={ChocolateBackground} style={styles.backgroundImage} resizeMode="stretch">
          <View style={styles.overlay} />   
          <View style={{ 
              //flex: 1,
              width: '80%',
              height: '80%',
              alignItems: 'center',
              justifyContent: 'center',
              paddingHorizontal: fontSize,
              backgroundColor: /*theme.primaryColor*/theme.secondaryColor, // Ensures this View has full opacity
              borderWidth: 4, // Adjust thickness
              borderColor: theme.primaryColor, // Border color from theme
              borderRadius: fontSize * 4, // Rounded corners for a smooth look
              shadowColor: '#000', // Optional shadow for depth
              shadowOffset: { width: 2, height: 2 },
              shadowOpacity: 0.3,
              shadowRadius: 4,
              elevation: 5, // Elevation for Android shadow
            }}>
      <View style={styles.container}>
        <ThemeText type={'popupHeaderText'} style={{ textAlign: 'center' }}>
          {translations.leaderboard}
        </ThemeText>
        
        <FlatList
          data={scoreList}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={styles.listContainer}
        />
        
        {/* "Naslednji igralec" Button */}
        <CustomButton
          text={translations.next_player}
          type="secondary"
          style={styles.nextPlayerButton}
          onButtonPress={() => navigation.navigate('Home')}
        />
      </View>
      </View>   
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Black background with 50% opacity
  },
  container: {    
    padding: fontSize * 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContainer: {
    flexGrow: 1,
    paddingVertical: 10,
    alignItems: 'center',
  },
  listItem: {
    paddingVertical: 5,
  },
  currentUserHighlight: {
    backgroundColor: 'green',
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  nextPlayerButton: {
    marginTop: 20,
    width: '70%',
  },
});

export default ListOfResultsScreen;
