function getRandomQuestions(numberOfQuestions = 10, questions = []) {
  if (!Array.isArray(questions)) {
    console.warn('getRandomQuestions: The "questions" parameter is not an array.');
    return []; // Return an empty array to avoid breaking
  }

  if (questions.length === 0) {
    console.warn('getRandomQuestions: The "questions" array is empty.');
    return []; // Return an empty array to avoid breaking
  }

  if (numberOfQuestions > questions.length) {
    console.warn('getRandomQuestions: Requested number exceeds available questions. Returning all questions.');
    return [...questions];
  }

  // Shuffle the questions array and select the desired number
  const shuffledQuestions = [...questions].sort(() => Math.random() - 0.5);
  return shuffledQuestions.slice(0, numberOfQuestions);
}

export default getRandomQuestions;
