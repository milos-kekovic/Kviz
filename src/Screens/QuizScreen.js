import React, { useContext, useState, useEffect } from 'react';
import { View, Text, StyleSheet, ImageBackground, Dimensions, ActivityIndicator } from 'react-native';
import { useTranslation } from 'react-i18next';
import { UserContext, ThemeContext } from '../Context';
import Toast from 'react-native-toast-message';
import { useFontSize, useElementSize, useBorderRadius, useBorderWidth } from '../Constants/Dimensions';
import { ThemeInput, CustomButton, ThemeText, Popup } from '../Components';
const { height, width } = Dimensions.get('window');
import getRandomQuestions from '../utils';

const ChocolateBackground = require('../../assets/chocolate-background.webp');
let timerInterval;
const numberOfQuestions = 10;

const QuizScreen = ({ navigation }) => {
  const { user = { userName: 'Guest', language: 'en', translations: null } } = useContext(UserContext);
  const { theme } = useContext(ThemeContext);
  const [userResultPopupVisibility, setUserResultPopupVisibility] = useState(false);
  const [answerSelected, setAnswerSelected] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [progressColors, setProgressColors] = useState(Array(numberOfQuestions).fill(null));
  const [initialWrongAnswer, setInitialWrongAnswer] = useState(false);
  const [timer, setTimer] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [initialCorrectAnswers, setInitialCorrectAnswers] = useState(0);
  const [score, setScore] = useState(0);
  const { i18n } = useTranslation();
  const [isPortrait, setIsPortrait] = useState(height > width);
  const [translations, setTranslations] = useState(user.translations); // Use stored translations
  const scaledFontSize = useFontSize(); // ✅ Get dynamic font size
  const scaledElementSize = useElementSize(); // ✅ Get dynamic element size
  const scaledBorderRadius = useBorderRadius(); // ✅ Get dynamic element size
  const scaledBorderWidth = useBorderWidth(); // ✅ Get dynamic element size
  const isTablet = width > 800;
  console.log('isTablet', isTablet)

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

  useEffect(() => {
    if (translations?.questions) {
      setQuizQuestions(getRandomQuestions(numberOfQuestions, translations.questions));
    }
  }, [translations]);

  // Stop the timer when the quiz ends
  useEffect(() => {
    if (currentQuestionIndex >= quizQuestions.length - 1 && answerSelected) {
      clearInterval(timerInterval);
    }
  }, [currentQuestionIndex, answerSelected]);

  // Show popup when score is calculated
  useEffect(() => {
    if (score > 0) {
      setUserResultPopupVisibility(true);
    }
  }, [score]);

  useEffect(() => {

    timerInterval = setInterval(() => {
      setTimer((prevTime) => prevTime + 1);
    }, 1000);

    const updateOrientation = () => {
      const { height, width } = Dimensions.get('window');
      setIsPortrait(height > width);
    };

    const subscription = Dimensions.addEventListener('change', updateOrientation);
  
    return () => {
      subscription?.remove(); // ✅ Correct way to remove listener
    };
  }, []);

  useEffect(() => {
    i18n.changeLanguage(user.language);
  }, [user.language]);

  const currentQuestion = quizQuestions[currentQuestionIndex];

  const handleAnswerPress = (answer) => {
    setSelectedAnswer(answer);
    const isAnswerCorrect = answer === currentQuestion.answer;
    setIsCorrect(isAnswerCorrect);
    setAnswerSelected(true);

    if (isAnswerCorrect) {
      setCorrectAnswers((prev) => prev + 1);
      if (!initialWrongAnswer) {
        setInitialCorrectAnswers((prev) => prev + 1);
      }
    }

    if (!isAnswerCorrect && !initialWrongAnswer) {
      setInitialWrongAnswer(true);
    }
  };

  const handleNextQuestion = () => {
    if (answerSelected) {
      const newProgressColors = [...progressColors];
      newProgressColors[currentQuestionIndex] = initialWrongAnswer ? styles.incorrectSquare.backgroundColor : styles.correctSquare.backgroundColor;
      setProgressColors(newProgressColors);

      if (currentQuestionIndex < quizQuestions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setSelectedAnswer(null);
        setIsCorrect(null);
        setAnswerSelected(false);
        setInitialWrongAnswer(false);
      } else {
        // Final question answered, show results and stop the timer
        clearInterval(timerInterval);
        const baseScore = (correctAnswers / quizQuestions.length) * 100;
        const timeFactor = Math.max(0.5, 1 + ((quizQuestions.length * 10 - timer) / quizQuestions.length) * 0.1);
        const finalScore = baseScore * timeFactor;
        setScore(parseFloat(finalScore.toFixed(2)));
        setUserResultPopupVisibility(true);
      }
    } else {
      Toast.show({
        type: 'info',
        text1: translations.no_answer_warning,
        visibilityTime: 2500,
      });
    }
  };

  if (!currentQuestion) {
    return <Text>Loading...</Text>;
  }

  const answerLabels = ["A", "B", "C", "D"];
  
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60).toString().padStart(2, '0');
    const seconds = (time % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
  };

  function renderUserResultPopup() {
    return (
      <Popup
        isVisible={userResultPopupVisibility}
        titleText={translations.quiz_result}
        cancelOption={true}
        onClose={() => setUserResultPopupVisibility(false)}
        onRightButtonPress={() => {setUserResultPopupVisibility(false); navigation.navigate('ListOfResultsScreen', { score })}}
        messageText = {`${translations.congratulations}, ${user.userName}!\n${initialCorrectAnswers} ${translations.from} ${quizQuestions.length} ${translations.correct_answers}\n${translations.your_result}: ${score}`}
      />
    )
  }

  
  
  if (!translations) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading translations...</Text>
      </View>
    );
  }

  return (
    <ImageBackground source={ChocolateBackground} style={styles.backgroundImage} resizeMode="stretch">
      <View style={styles.overlay} />            
        <View style={{
          position: 'absolute',
          top: 10,
          right: 10,
          padding: 10,
          //backgroundColor: 'rgba(0, 0, 0, 0.5)',
          borderRadius: scaledBorderRadius,
          borderColor: '#d7ccc8',
          borderWidth: scaledBorderWidth
        }}>
          <ThemeText type="freeTextInvert">{formatTime(timer)}</ThemeText>
        </View>
      <View style={styles.container}>
        {renderUserResultPopup()}
        <View style={styles.progressBarContainer}>
          <View style={{ flexDirection: 'row' }}>
            {Array.from({ length: numberOfQuestions }).map((_, index) => (
              <View
                key={index}
                style={[
                  {width: width * 0.05,
                    height: width * 0.05,
                    margin: width * 0.01,
                    borderRadius: scaledBorderRadius
                  },
                  index === currentQuestionIndex
                    ? styles.currentQuestionSquare
                    : progressColors[index]
                      ? { backgroundColor: progressColors[index] }
                      : styles.unfilledSquare
                ]}
              />
            ))}
          </View>
          <ThemeText type="freeTextInvert" style={{marginBottom: scaledFontSize}}>
            {`${currentQuestionIndex + 1} / ${quizQuestions.length}`}
          </ThemeText>
        </View>
        <View style={styles.questionContainer}>
        <View style={{ 
              //flex: 1,
              width: '100%',
              height: '30%',
              alignItems: 'center',
              justifyContent: 'center',
              paddingHorizontal: scaledFontSize,
              backgroundColor: /*theme.primaryColor*/theme.secondaryColor, // Ensures this View has full opacity
              borderWidth: scaledBorderWidth, // Adjust thickness
              borderColor: theme.primaryColor, // Border color from theme
              borderRadius: scaledBorderRadius, // Rounded corners for a smooth look
              shadowColor: '#000', // Optional shadow for depth
              shadowOffset: { width: 2, height: 2 },
              shadowOpacity: 0.3,
              shadowRadius: 4,
              elevation: 5, // Elevation for Android shadow
            }}>
          <ThemeText type="freeText">
            {currentQuestion.question}
          </ThemeText>
          </View> 
          <View style={isTablet ? styles.gridLayout : styles.columnLayout}>
          {currentQuestion.options.map((option, index) => (
            <View key={index} style={styles.answerContainer}>
              <ThemeText type="freeTextInvert">{answerLabels[index]}</ThemeText>
              <CustomButton
                text={option}
                type="secondary"
                onButtonPress={() => handleAnswerPress(option)}
                customBackgroundColor={
                  selectedAnswer === option
                    ? isCorrect
                      ? styles.correctAnswer.backgroundColor
                      : styles.incorrectAnswer.backgroundColor
                    : null
                }
                style={{ width: isTablet ? width * 0.4 : width * 0.8 }}
              />
            </View>
          ))}
        </View>
        <View style={{ minHeight: scaledElementSize * 2, justifyContent: 'center', alignItems: 'center' }}>
          {isCorrect !== null ? (
            <ThemeText type="freeTextInvert">
              {isCorrect ? translations.correct : translations.incorrect_try_again}
            </ThemeText>
          ) : (
            
              <ThemeText type="freeTextInvert" style={{marginTop: height * 0.025}}>
              </ThemeText>
            )
          }
        </View>
        </View>
        <View style={styles.navigationButtonsContainer}>
          <View style={styles.rowNavigation}>
            <CustomButton
              text={currentQuestionIndex < quizQuestions.length - 1 ? translations.next/*"Naslednje vprašanje"*/ : translations.finish}
              type="secondary"
              style={{backgroundColor: theme.secondaryBackground, color: theme.secondaryColor}}
              onButtonPress={handleNextQuestion}
              disabled={!answerSelected}
            />
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
    alignItems: 'center'
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Black background with 50% opacity
  },
  container: {
    flex: 1,
    width: '90%',
    height: '75%',
    justifyContent: 'center',
    alignItems: 'center'/*,
    backgroundColor: 'yellow'*/
    //backgroundColor: 'red'
    /*backgroundColor: '#F7F1D9',
    borderColor: '#3e2723',
    borderWidth: 5,
    borderRadius: 10,
    padding: 15,
    shadowColor: '#3e2723',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 6,
    elevation: 8,*/
    //backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  progressBarContainer: {
    flex: 0.3,
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center'
  },
  correctSquare: {
    backgroundColor: '#27ae60', // Green for correct answers
  },
  incorrectSquare: {
    backgroundColor: '#e74c3c', // Red for incorrect answers
  },
  unfilledSquare: {
    backgroundColor: '#d7ccc8', // Lighter cocoa color for unfilled square
  },
  questionContainer: {
    flex: 0.5,
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column'
  },
  columnLayout: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  gridLayout: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  answerContainer: {
    alignItems: 'center',
    marginVertical: 5,
    //width: '45%',
  },
  answerButton: {
    backgroundColor: '#4e342e',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  currentQuestionSquare: {
    backgroundColor: '#8d6e63', // Cocoa color for the current question
  },
  correctAnswer: {
    backgroundColor: '#27ae60',
  },
  incorrectAnswer: {
    backgroundColor: '#e74c3c',
  },
  navigationButtonsContainer: {
    flex: 0.2,
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
  },
  rowNavigation: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 30
  },
  navigationButton: {
    backgroundColor: '#F8F2DA',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    width: '30%',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});

export default QuizScreen;
