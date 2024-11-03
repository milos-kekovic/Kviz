import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { UserContext } from '../Context';

const ResultScreen = ({ route, navigation }) => {
  const { user } = useContext(UserContext);
  const { score, totalQuestions } = route.params; // Passed from QuizScreen
  
  const scorePercentage = Math.round((score / totalQuestions) * 100);

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Quiz Results</Text>
      <Text style={styles.usernameText}>Well done, {user}!</Text>
      <Text style={styles.scoreText}>You scored {score} out of {totalQuestions}</Text>
      <Text style={styles.percentageText}>{scorePercentage}%</Text>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Quiz')}>
        <Text style={styles.buttonText}>Try Again</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.button, styles.homeButton]} onPress={() => navigation.navigate('Home')}>
        <Text style={styles.buttonText}>Back to Home</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  headerText: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  usernameText: {
    fontSize: 20,
    marginBottom: 20,
  },
  scoreText: {
    fontSize: 24,
    fontWeight: '600',
    marginVertical: 10,
  },
  percentageText: {
    fontSize: 20,
    marginBottom: 40,
  },
  button: {
    backgroundColor: '#3498db',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginVertical: 10,
  },
  homeButton: {
    backgroundColor: '#95a5a6',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18,
    textAlign: 'center',
  },
});

export default ResultScreen;
