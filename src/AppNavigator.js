import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import HomeScreen from './Screens/HomeScreen';
import QuizScreen from './Screens/QuizScreen';
import UserResultScreen from './Screens/UserResultScreen';
import ListOfResultsScreen from './Screens/ListOfResultsScreen';

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Quiz" component={QuizScreen} />
      <Stack.Screen name="UserResultScreen" component={UserResultScreen} />
      <Stack.Screen name="ListOfResultsScreen" component={ListOfResultsScreen} />
    </Stack.Navigator>
  );
}
