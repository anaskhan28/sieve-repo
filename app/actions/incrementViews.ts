'use server'

import SupabaseServerClient from "@/utils/supabase/server";

export async function incrementViews(playlistId: string) { 
  const supabase = await SupabaseServerClient();

  
  const { data, error: fetchError } = await supabase
    .from('playlist_views')
    .select('id, views')
    .eq('playlist_id', playlistId)
    .single();

  if (fetchError && fetchError.code !== 'PGRST116') {
    console.error('Error fetching view count:', fetchError);
    return false;
  }

  let updateResult;

  if (data) {
    // If entry exists, increment the view count
    updateResult = await supabase
      .from('playlist_views')
      .update({ views: data.views + 1, updated_at: new Date().toISOString() })
      .eq('id', data.id);
  } else {
    // If no entry exists, create a new one
    updateResult = await supabase
      .from('playlist_views')
      .insert({ playlist_id: playlistId, views: 1 });
  }

  if (updateResult.error) {
    console.error('Error updating view count:', updateResult.error);
    return false;
  }

  return true;
}