
import { createClient } from 'https://esm.sh/@supabase/supabase-js@^2.48.0';

const supabaseUrl = 'https://your-project-id.supabase.co';
const supabaseKey = 'your-anon-key';

// Note: In a production environment, these would be process.env variables.
// Users must update these with their own Supabase project credentials.
export const supabase = createClient(supabaseUrl, supabaseKey);
