import 'react-native-url-polyfill/auto';
import { createClient } from '@supabase/supabase-js';

// Supabase credentials
const supabaseUrl = 'https://woauvhessgfnndsdvnvr.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndvYXV2aGVzc2dmbm5kc2R2bnZyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzgxNTgyMDksImV4cCI6MjA1MzczNDIwOX0.LyC3uQgc1W_9GbSYHrEVihmNUpKvLSNvfZYeDrHOc4c';

// ✅ Create and export Supabase client
const supabase = createClient(supabaseUrl, supabaseKey);
export default supabase;
