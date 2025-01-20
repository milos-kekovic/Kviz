function getRandomQuestions(numberOfQuestions = 10, questions = []) {
  if (!Array.isArray(questions) || questions.length === 0) {
    console.warn('getRandomQuestions: Invalid or empty questions array.');
    return []; // Return an empty array to avoid breaking
  }

  const shuffledQuestions = [...questions].sort(() => Math.random() - 0.5);
  return shuffledQuestions.slice(0, numberOfQuestions);
}

export default getRandomQuestions;
