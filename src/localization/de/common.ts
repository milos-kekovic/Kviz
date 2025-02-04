import { fetchQuestions } from '../../i18n';

const loadTranslations = async () => {
    return {
        first_and_last_name: 'Geben Sie Ihren Vor- und Nachnamen ein',
        last_name: 'Last Name',
        login: 'Login',
        welcome: 'Welcome',
        choose_language: 'Sprache ändern',
        start_quiz: 'Beginne das Quiz',
        questions: await fetchQuestions('de'), // ✅ Now await is used correctly
        next: 'Weiter',
        no_answer_warning: "Bitte wählen Sie zuerst eine Antwort aus",
        finish: "Beenden",
        quiz_result: "Quiz-Ergebnis",
        congratulations: "Herzlichen Glückwunsch",
        from: "von",
        correct_answers: "richtige Antworten",
        your_result: "Unter Berücksichtigung Ihrer Zeit ist Ihr Ergebnis",
        confirm: "Bestätigen",
        cancel: "Stornieren",
        leaderboard: "Bestenliste",
        next_player: "Nächster Spieler",
        correct: "Richtig",
        incorrect_try_again: "Falsch, versuche es erneut"
    };
};

export default loadTranslations;
