import 'react-native-url-polyfill/auto';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase Client
const supabaseUrl = 'https://woauvhessgfnndsdvnvr.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndvYXV2aGVzc2dmbm5kc2R2bnZyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzgxNTgyMDksImV4cCI6MjA1MzczNDIwOX0.LyC3uQgc1W_9GbSYHrEVihmNUpKvLSNvfZYeDrHOc4c';
const supabase = createClient(supabaseUrl, supabaseKey);

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
