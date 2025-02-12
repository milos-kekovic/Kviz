import supabase from '../supabaseClient'; // ✅ Import Supabase from supabaseClient.js

export const loadTranslations = async (language = 'sl') => {
    try {
        // Fetch Translations (UI Texts) from `translations` table
        const { data: translationsData, error: translationsError } = await supabase
            .from('translations')
            .select('key, value')
            .eq('language_code', language);

        if (translationsError) {
            console.error('Error fetching translations:', translationsError);
            return null;
        }

        // Convert translations array into an object
        const translations = translationsData.reduce((acc, { key, value }) => {
            acc[key] = value;
            return acc;
        }, {});

        // Fetch Questions from `questions` table
        const { data: questionsData, error: questionsError } = await supabase
            .from('questions')
            .select('*')
            .eq('language_code', language);

        if (questionsError) {
            console.error('Error fetching questions:', questionsError);
            return null;
        }

        // Return combined translations & questions
        return {
            ...translations, // ✅ UI Translations (e.g., start_quiz, welcome, etc.)
            questions: questionsData // ✅ Questions Array
        };

    } catch (error) {
        console.error('Error loading translations:', error);
        return null;
    }
};

export default loadTranslations;
