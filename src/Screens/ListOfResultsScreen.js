import React, { useEffect, useState, useContext } from 'react';
import { View, StyleSheet, ImageBackground, FlatList } from 'react-native';
import { UserContext } from '../Context';
import { ThemeText, CustomButton } from '../Components';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ChocolateBackground = require('../../assets/resized_chocolate_quiz_background_4K_UHD_v2.png');

const ListOfResultsScreen = ({ route, navigation }) => {
  const { user } = useContext(UserContext);
  const { score } = route.params;
  const [scoreList, setScoreList] = useState([]);

  useEffect(() => {
    const loadAndSaveScores = async () => {
      const storedScores = await AsyncStorage.getItem('scoreList');
      let currentScores = storedScores ? JSON.parse(storedScores) : [];

      const existingUser = currentScores.find((item) => item.user === user);

      if (existingUser) {
        // Update the score only if the new score is higher
        currentScores = currentScores.map((item) =>
          item.user === user ? { ...item, score: Math.max(item.score, score) } : item
        );
      } else {
        // Add new user and score to the list
        currentScores = [...currentScores, { user, score }];
      }

      // Sort scores in descending order
      currentScores.sort((a, b) => b.score - a.score);

      await AsyncStorage.setItem('scoreList', JSON.stringify(currentScores));
      setScoreList(currentScores);
    };

    loadAndSaveScores();
  }, [user, score]);

  const resetLeaderboard = async () => {
    await AsyncStorage.removeItem('scoreList');
    setScoreList([]);
  };

  const renderItem = ({ item, index }) => (
    <View style={[styles.listItem, item.user === user ? styles.currentUserHighlight : null]}>
      <ThemeText type={'freeText'}>
        {`${index + 1}. ${item.user} - ${item.score.toFixed(2)}`}
      </ThemeText>
    </View>
  );

  return (
    <ImageBackground source={ChocolateBackground} style={styles.backgroundImage} resizeMode="stretch">
      <View style={styles.container}>
        <ThemeText type={'popupHeaderText'} style={{ textAlign: 'center' }}>
          {'Vodilna Lestvica'}
        </ThemeText>
        
        <FlatList
          data={scoreList}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={styles.listContainer}
        />
        
        {/* "Naslednji igralec" Button */}
        <CustomButton
          text="Naslednji igralec"
          type="secondary"
          style={styles.nextPlayerButton}
          onButtonPress={() => navigation.navigate('Home')}
        />
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
  container: {
    width: '25%',
    height: '45%',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContainer: {
    flexGrow: 1, // Ensures the FlatList container can grow and scroll as needed
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
