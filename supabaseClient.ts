
import { createClient } from 'https://esm.sh/@supabase/supabase-js@^2.48.0';

const supabaseUrl = 'https://alnhkwnamccioipzragn.supabase.co';
const supabaseKey = 'sb_publishable_WgJVDirCzGL0O0HLE3qn3g_HNbZYAOB';

export const supabase = createClient(supabaseUrl, supabaseKey);

/**
 * Helper to upload images to Supabase Storage
 * Assumes a bucket named 'portfolio' exists and is public
 */
export const uploadImage = async (file: File) => {
  const fileExt = file.name.split('.').pop();
  const fileName = `${Math.random()}.${fileExt}`;
  const filePath = `uploads/${fileName}`;

  const { data, error } = await supabase.storage
    .from('portfolio')
    .upload(filePath, file);

  if (error) throw error;

  const { data: { publicUrl } } = supabase.storage
    .from('portfolio')
    .getPublicUrl(filePath);

  return publicUrl;
};
