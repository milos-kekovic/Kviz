import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = 'https://woauvhessgfnndsdvnvr.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndvYXV2aGVzc2dmbm5kc2R2bnZyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzgxNTgyMDksImV4cCI6MjA1MzczNDIwOX0.LyC3uQgc1W_9GbSYHrEVihmNUpKvLSNvfZYeDrHOc4c';
const supabase = createClient(supabaseUrl, supabaseKey);

export const fetchQuestions = async (language) => {
    const { data, error } = await supabase
        .from('questions')
        .select('*')
        .eq('language_code', language);
        console.error('data:', data);

    if (error) {
        console.error('Error fetching questions:', error);
        return [];
    }

    return data;
};

