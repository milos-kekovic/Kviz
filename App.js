import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { LightTheme, ThemeContext } from './src/Context'
import { ThemeInput } from './src/Components'

const App = () => {
  const [theme, setTheme] = useState(LightTheme)
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <View style={styles.container}>
        <Text style={styles.title}>Čoko Kviz!</Text>
        <Text style={styles.subtitle}>This is your basic React Native app setup.</Text>
        <ThemeInput
              style={{ marginVertical: 7 }}
              label='Tvoje ime in priimek'
              required={true}
              returnKeyType={'done'}
              blurOnSubmit={false}
              clearButtonMode={'always'}
              multiline={false}
              value=''
              placeholder='Tvoje ime in priimek'
              /*onChangeText={(text) => {
                updateCard(state, text)
              }}*/
            />
      </View>
    </ThemeContext.Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginTop: 8,
  },
});

export default App;
