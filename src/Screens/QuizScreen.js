import React, { useContext, useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground, Dimensions } from 'react-native';
import { UserContext } from '../Context'; // Import UserContext
import Toast from 'react-native-toast-message';
import { fontSize } from '../Constants/Dimensions'
import { ThemeInput, CustomButton, ThemeText, Popup } from '../Components';
const { height, width, fontScale } = Dimensions.get('window')
import getRandomQuestions from '../utils'; // Ensure this function selects 10 random questions

// Chocolate background image (add your chocolate image to assets)
//const ChocolateBackground = require('../../assets/chocolate-background.webp');
const ChocolateBackground = require('../../assets/Resized_Final_Background_4K_UHD.jpg');
let timerInterval

const QuizScreen = ({ navigation }) => {  
  const { user } = useContext(UserContext); // Access the user context
  const [userResultPopupVisibility, setUserResultPopupVisibility] = useState(false);
  const [answerSelected, setAnswerSelected] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [progressColors, setProgressColors] = useState(Array(10).fill(null)); // Initialize with 10 null values
  const [initialWrongAnswer, setInitialWrongAnswer] = useState(false); // Track if user answered wrong initially
  const [timer, setTimer] = useState(0); // Timer state to keep track of elapsed time
  const [correctAnswers, setCorrectAnswers] = useState(0); // Track correct answers
  const [score, setScore] = useState(0); // Track correct answers

  useEffect(() => {
    const selectedQuestions = getRandomQuestions(); // Select 10 questions randomly
    setQuizQuestions(selectedQuestions);

    // Start timer when quiz begins
    timerInterval = setInterval(() => {
      setTimer((prevTime) => prevTime + 1);
    }, 1000);

    return () => clearInterval(timerInterval); // Clean up timer on component unmount
  }, []);

  useEffect(() => {
    // Stop the timer when the quiz ends
    if (currentQuestionIndex >= quizQuestions.length - 1 && answerSelected) {
      clearInterval(timerInterval);
    }
  }, [currentQuestionIndex, answerSelected]);

  useEffect(() => {
    if (score > 0) { // Show popup only when a score is set after the quiz ends
      setUserResultPopupVisibility(true);
    }
  }, [score]);

  const currentQuestion = quizQuestions[currentQuestionIndex];

  const handleAnswerPress = (answer) => {
    setSelectedAnswer(answer);
    const isAnswerCorrect = answer === currentQuestion.answer;
    setIsCorrect(answer === currentQuestion.answer);
    if (isAnswerCorrect) {
      setCorrectAnswers((prev) => prev + 1); // Increment correct answers
    }
    // If it's the first wrong attempt, set initialWrongAnswer to true
    if (!isAnswerCorrect && !initialWrongAnswer) {
      setInitialWrongAnswer(true);
    }
    setAnswerSelected(true); // Mark as selected once any answer is clicked
  };

  const handleNextQuestion = () => {
    if (answerSelected) { // Ensure an answer is selected
      // Update progressColors based on whether the answer was correct or incorrect
      const newProgressColors = [...progressColors];
      newProgressColors[currentQuestionIndex] = initialWrongAnswer ? styles.incorrectSquare.backgroundColor : styles.correctSquare.backgroundColor;
      setProgressColors(newProgressColors);

      if (currentQuestionIndex < quizQuestions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setSelectedAnswer(null);
        setIsCorrect(null);
        setAnswerSelected(false); // Reset for next question
        setInitialWrongAnswer(false); // Reset initial wrong answer tracking
      } else {
        console.log("End of quiz");
        clearInterval(timerInterval); // Stop timer when quiz ends
        // Logic to handle end of quiz, e.g., navigate to a result screen
        // Navigate to ResultsScreen on quiz completion
        const baseScore = (correctAnswers / quizQuestions.length) * 100;
        const timeFactor = 1 + ((quizQuestions.length * 10 - timer) / quizQuestions.length) * 0.1;
        const score = baseScore * timeFactor;
        setScore(parseFloat(score.toFixed(2)));
      }
    } else {
      Toast.show({
        type: 'info',
        text1: 'Najprej izberi odgovor',
        visibilityTime: 2500, // Duration of the toast
      });
    }
  };

  if (!currentQuestion) {
    return <Text>Loading...</Text>;
  }

  const answerLabels = ["A", "B", "C", "D"];

  // Format the timer to MM:SS
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60).toString().padStart(2, '0');
    const seconds = (time % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
  };

  function renderUserResultPopup() {
    return (
      <Popup
        isVisible={userResultPopupVisibility}
        onClose={() => setUserResultPopupVisibility(false)}
        titleText={'Rezultat Kviza'}
        cancelOption={true}
        wrapContent={
          <View style={{ alignSelf: 'center', justifyContent: 'center' }}>
            <ThemeText text={`Bravo, ${user}!`} type={'freeText'} style={{textAlign:'center'}} />
            <ThemeText text={`${correctAnswers} od ${quizQuestions.length} točnih odgovorov`} type={'freeText'} style={{textAlign:'center'}} />
            <ThemeText text={`Upoštevajoč tvoj čas, je tvoj rezultat: ${score}`} type={'freeText'} style={{textAlign:'center'}} />
            <View style={{ alignSelf: 'center', justifyContent: 'space-around', flexDirection: 'row', marginTop: height * 0.02 }}>
              <CustomButton type={'primary'} text={'Prekliči'} onButtonPress={() => setUserResultPopupVisibility(false)} style={{width: width * 0.1, marginRight: width * 0.01}}/>
              <CustomButton type={'primary'} text={'Potrdi'} onButtonPress={() => {setUserResultPopupVisibility(false); navigation.navigate('ListOfResultsScreen', { score })}} style={{width: width * 0.1}} />
            </View>
          </View>
        }
      />
    )
  }

  return (
    <ImageBackground source={ChocolateBackground} style={styles.backgroundImage} resizeMode="stretch">
      {/* Timer Display */}
      <View style={styles.timerContainer}>
        <Text style={styles.timerText}>{formatTime(timer)}</Text>
      </View>
      <View style={styles.container}>
        {renderUserResultPopup()}
        {/* Progress Bar View */}
        <View style={styles.progressBarContainer}>
          <View style={{ flexDirection: 'row' }}>
            {Array.from({ length: 10 }).map((_, index) => (
              <View
                key={index}
                style={[
                  styles.progressBarSquare,
                  progressColors[index] ? { backgroundColor: progressColors[index] } : styles.unfilledSquare
                ]}
              />
            ))}
          </View>
          <ThemeText type="headerText" text={`${currentQuestionIndex + 1} / ${quizQuestions.length}`} style={{marginBottom: fontSize * 0.05}}/>
        </View>
        {/* Question View */}
        <View style={styles.questionContainer}>
          <ThemeText type="headerText" text={currentQuestion.question} />
          <View style={styles.row}>
            {currentQuestion.options.slice(0, 2).map((option, index) => (
              <View key={index} style={styles.answerContainer}>
                <ThemeText type="headerText" text={answerLabels[index]} style={{marginBottom: fontSize * 0.05}}/>
                <CustomButton
                  text={option}
                  type="secondary"
                  onButtonPress={() => handleAnswerPress(option)}
                  style={[
                    { width: width * 0.15 },
                    selectedAnswer === option
                      ? { backgroundColor: isCorrect ? styles.correctAnswer.backgroundColor : styles.incorrectAnswer.backgroundColor }
                      : {}
                  ]}
                />
              </View>
            ))}
          </View>

          <View style={styles.row}>
            {currentQuestion.options.slice(2, 4).map((option, index) => (
              <View key={index} style={styles.answerContainer}>
                <ThemeText type="headerText" text={answerLabels[index + 2]} style={{marginBottom: fontSize * 0.05}}/>
                  <CustomButton
                    text={option}
                    type="secondary"
                    onButtonPress={() => handleAnswerPress(option)}
                    style={[
                      { width: width * 0.15 },
                      selectedAnswer === option
                        ? { backgroundColor: isCorrect ? styles.correctAnswer.backgroundColor : styles.incorrectAnswer.backgroundColor }
                        : {}
                    ]}
                  />
              </View>
            ))}
          </View>

          {isCorrect !== null ? (
            <ThemeText type="headerText" text={isCorrect ? "Pravilno!" : "Napačno, poskusi znova!"} style={{marginTop: height * 0.025}}/>
          ):
          (
            <ThemeText type="headerText" text={""} style={{marginTop: height * 0.025}}/>
          )}      
        </View>
        <View style={styles.navigationButtonsContainer}>
          {/* Next Question and Previous Screen Buttons */}
          <View style={styles.rowNavigation}>
            <CustomButton
              text="Naslednje vprašanje"
              type="secondary"
              onButtonPress={() => {
                console.log('Button pressed!')
                handleNextQuestion();
              }}
              disabled={!answerSelected} // Disable button if no answer selected
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
  container: {
    //flex: 1,
    width: '40%',
    height: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: height * 0.05
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
  timerContainer: {
    position: 'absolute',
    top: 10,
    right: 10,
    padding: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 5,
  },
  timerText: {
    color: '#fff',
    fontSize: fontSize,
    fontWeight: 'bold',
  },
  progressBarContainer: {
    flex: 0.2,
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center'
  },
  progressBarSquare: {
    width: 30,
    height: 30,
    margin: 10,
    borderRadius: 4,
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
  progressText: {
    fontSize: 26,
    color: '#fff5e4',
    marginBottom: 20,
    fontSize: 34,
    fontWeight: 'bold',
  },
  questionContainer: {
    flex: 0.6,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column'
  },
  questionText: {
    fontSize: fontSize,
    fontWeight: 'bold',
    color: '#fff5e4',
    marginBottom: 20,
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    paddingHorizontal: 30,
    marginTop: height * 0.01
  },
  answerContainer: {
    alignItems: 'center',
    //width: '45%',
  },
  answerLabel: {
    fontSize: fontSize,
    fontWeight: 'bold',
    color: '#fff5e4',
    marginBottom: fontSize * 0.05
  },
  answerButton: {
    backgroundColor: '#4e342e',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  answerText: {
    color: '#d7ccc8',
    fontSize: fontSize * 0.7,
    textAlign: 'center',
  },
  correctAnswer: {
    backgroundColor: '#27ae60',
  },
  incorrectAnswer: {
    backgroundColor: '#8d6e63',
  },
  resultText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#fff5e4',
    marginTop: 20,
  },
  navigationButtonsContainer: {
    flex: 0.2,
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center'
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
  navigationButtonText: {
    color: '#4e342e',
    fontSize: 26,
    fontWeight: '600',
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
});

export default QuizScreen;
