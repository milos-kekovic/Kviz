// utils.js
import questions from './Constants/Questions';

function getRandomQuestions(numberOfQuestions = 10) {
  const shuffledQuestions = [...questions].sort(() => Math.random() - 0.5);
  return shuffledQuestions.slice(0, numberOfQuestions);
}

export default getRandomQuestions;
