import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ListOfResultsScreen = ({ route, navigation }) => {
  const { score } = route.params;
  const [userName, setUserName] = useState('');
  const [scoreList, setScoreList] = useState([]);

  useEffect(() => {
    // Load existing scores from storage
    const loadScores = async () => {
      const storedScores = await AsyncStorage.getItem('scoreList');
      if (storedScores) {
        setScoreList(JSON.parse(storedScores));
      }
    };

    loadScores();
  }, []);

  const handleSaveScore = async () => {
    if (!userName) {
      alert('Please enter a user name');
      return;
    }

    // Check if the user already exists in the list
    const existingUser = scoreList.find((item) => item.userName === userName);

    let updatedScoreList;
    if (existingUser) {
      // Update existing user's score if necessary
      updatedScoreList = scoreList.map((item) =>
        item.userName === userName ? { ...item, score } : item
      );
    } else {
      // Add new user and score to the list
      updatedScoreList = [...scoreList, { userName, score }];
    }

    // Save the updated list to AsyncStorage
    await AsyncStorage.setItem('scoreList', JSON.stringify(updatedScoreList));
    setScoreList(updatedScoreList);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Your Score</Text>
      <Text style={styles.scoreText}>Score: {score.toFixed(2)}</Text>

      <TextInput
        placeholder="Enter your name"
        value={userName}
        onChangeText={setUserName}
        style={styles.input}
      />
      <Button title="Save Score" onPress={handleSaveScore} />

      <Text style={styles.listHeader}>Leaderboard</Text>
      {scoreList.map((item, index) => (
        <Text key={index} style={styles.listItem}>
          {item.userName}: {item.score.toFixed(2)}
        </Text>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  scoreText: {
    fontSize: 20,
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 20,
    width: '80%',
  },
  listHeader: {
    fontSize: 20,
    marginTop: 20,
    fontWeight: 'bold',
  },
  listItem: {
    fontSize: 18,
    marginVertical: 5,
  },
});

export default ListOfResultsScreen;
