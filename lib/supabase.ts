import 'react-native-url-polyfill/auto';
import { createClient } from '@supabase/supabase-js';


const supabaseUrl = 'https://bmlyukvdtegczcksvpaq.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJtbHl1a3ZkdGVnY3pja3N2cGFxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDMzNjQxMzMsImV4cCI6MjA1ODk0MDEzM30.Ks932QA0zz6p6gXTX9qFJvYe5ZW9NyrNQE5Yw5RQqH4';

export const supabase = createClient(supabaseUrl, supabaseKey); 