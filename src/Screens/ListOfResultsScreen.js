import React, { useEffect, useState, useContext } from 'react';
import { View, StyleSheet, ImageBackground, FlatList, ActivityIndicator } from 'react-native';
import { UserContext, ThemeContext } from '../Context';
import { ThemeText, CustomButton } from '../Components';
import { fontSize, useElementMargin } from '../Constants/Dimensions';
import { useTranslation } from 'react-i18next';
import supabase from '../supabaseClient'; // Import Supabase client
console.log('Supabase client:', supabase); // ✅ Debugging Supabase

const ChocolateBackground = require('../../assets/chocolate-background.webp');

const ListOfResultsScreen = ({ route, navigation }) => {
  const { user } = useContext(UserContext);
  const { theme } = useContext(ThemeContext);
  const { score } = route.params;
  const { i18n } = useTranslation();
  const [translations, setTranslations] = useState(user.translations);
  const [scoreList, setScoreList] = useState([]);
  const [loading, setLoading] = useState(true);
  const scaledElementMargin = useElementMargin(); // ✅ Get dynamic element size

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

  // 🔹 Upload or Update User Score in Supabase
  const uploadUserScore = async () => {
    console.log('Uploading score for:', user.userName, score); // ✅ Debugging
    try {
      const { data: existingScores, error: fetchError } = await supabase
        .from('leaderboard')
        .select('*')
        .eq('user_name', user.userName);

      if (fetchError) throw fetchError;

      if (existingScores.length > 0) {
        // Update score if it's higher
        const existingScore = existingScores[0].score;
        if (score > existingScore) {
          await supabase
            .from('leaderboard')
            .update({ score })
            .eq('user_name', user.userName);

            if (updateError) throw updateError;
            console.log('Score updated successfully!');
        } else {
          console.log('New score is not higher. No update needed.');
        }
      } else {
        // Insert new score if user doesn't exist in the leaderboard
        const { error: insertError } = await supabase
                .from('leaderboard')
                .insert([{ user_name: user.userName, score }]);

            if (insertError) throw insertError;
            console.log('New user added to leaderboard!');
      }
    } catch (error) {
      console.error('Error updating leaderboard:', error);
    }
  };

  // 🔹 Fetch Leaderboard Data from Supabase
  const fetchLeaderboard = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('leaderboard')
        .select('*')
        .order('score', { ascending: false });

      if (error) throw error;

      setScoreList(data);
    } catch (error) {
      console.error('Error fetching leaderboard:', error);
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Upload score and then fetch updated leaderboard
  useEffect(() => {
    const updateLeaderboard = async () => {
      await uploadUserScore();
      await fetchLeaderboard();
    };
    updateLeaderboard();
  }, [score]);

  // 🔹 Reset Leaderboard (Clear Supabase Table)
  const resetLeaderboard = async () => {
    try {
      await supabase.from('leaderboard').delete().neq('id', 0);
      setScoreList([]);
    } catch (error) {
      console.error('Error resetting leaderboard:', error);
    }
  };

  const renderItem = ({ item, index }) => (
    <View style={[styles.listItem, item.user_name === user.userName ? styles.currentUserHighlight : null]}>
      <ThemeText type={'freeText'}>
        {`${index + 1}. ${item.user_name} - ${item.score.toFixed(2)}`}
      </ThemeText>
    </View>
  );

  return (
    <ImageBackground source={ChocolateBackground} style={styles.backgroundImage} resizeMode="stretch">
      <View style={styles.overlay} />
      <View style={{ width: '80%', height: '80%', alignItems: 'center', justifyContent: 'center', padding: scaledElementMargin, backgroundColor: theme.secondaryColor, borderWidth: 4, borderColor: theme.primaryColor, borderRadius: fontSize * 4, shadowColor: '#000', shadowOffset: { width: 2, height: 2 }, shadowOpacity: 0.3, shadowRadius: 4, elevation: 5 }}>
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <ThemeText type={'popupHeaderText'} style={{ textAlign: 'center' }}>
            {translations.leaderboard}
          </ThemeText>

          {loading ? (
            <ActivityIndicator size="large" color={theme.primaryColor} />
          ) : (
            <FlatList
              data={scoreList}
              renderItem={renderItem}
              keyExtractor={(item, index) => index.toString()}
              contentContainerStyle={styles.listContainer}
            />
          )}

          {/* Reset & Next Player Buttons */}
          <View style={{justifyContent: 'center', alignItems: 'center', width: '100%'}}>
            <CustomButton text={translations.next_player} type="secondary" onButtonPress={() => navigation.navigate('Home')} />
            {/* <CustomButton text="Reset Leaderboard" type="primary" style={styles.nextPlayerButton} onButtonPress={resetLeaderboard} /> */}
          </View>
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
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
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
  }
});

export default ListOfResultsScreen;
