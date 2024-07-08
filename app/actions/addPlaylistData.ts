"use server"
import { PlaylistType } from "@/types/Types";
import SupabaseServerClient from "@/utils/supabase/server";
import playlists from "@/playlist.json";
import {getThumbnailUrl} from './fetchThumbnails'


const addOrUpdatePlaylistData = async (): Promise<PlaylistType[] | null> => {
  const supabase = await SupabaseServerClient();

  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    console.log('NO USER', user);
    return null;
  }

  // Fetch existing playlist data
  const { data: existingPlaylists, error: fetchError } = await supabase.from('playlistsInfo').select("*");

  if (fetchError) {
    console.log(fetchError, 'fetchError');
    return null;
  }

  const existingPlaylistIds = existingPlaylists.map(playlist => playlist.playlist_id);

  const newPlaylists = playlists.filter(playlist => !existingPlaylistIds.includes(playlist.id));

  
  const updatedPlaylists = playlists.filter(playlist => {
    const existingPlaylist = existingPlaylists.find(ep => ep.playlist_id === playlist.id);
    return existingPlaylist && (
      existingPlaylist.user_name !== playlist.name ||
      existingPlaylist.playlist_url !== playlist.playlist_link ||
      existingPlaylist.playlist_summary !== playlist.summary ||
      existingPlaylist.playlist_title !== playlist.title ||
      existingPlaylist.playlist_category !== playlist.category ||
      existingPlaylist.user_profile_link !== playlist.user_profile_link ||
      existingPlaylist.user_profile_Image_link !== playlist.user_Image
    );
  });

  if (newPlaylists.length === 0 && updatedPlaylists.length === 0) {
    console.log("No new or updated playlists");
    return [];
  }


  const playlistDataToUpdate =  await Promise.all(updatedPlaylists.map(async({ name, id, user_Image, playlist_link, summary, title, category, user_profile_link }) => {
    const thumbnailUrl = await getThumbnailUrl(playlist_link);
return {
    playlist_id: id,
    user_name: name,
    playlist_url: playlist_link,
    playlist_summary: summary,
    playlist_title: title,
    playlist_category: category,
    playlist_image: thumbnailUrl,
    user_profile_link,
    user_profile_Image_link: user_Image
  }}));
  const playlistDataToInsert = await Promise.all(newPlaylists.map(async ({ name, id, user_Image, playlist_link, summary, title, category, user_profile_link }) => {
      const thumbnailUrl = await getThumbnailUrl(playlist_link);
      return {
        playlist_id: id,
        user_name: name,
        playlist_url: playlist_link,
        playlist_summary: summary,
        playlist_title: title,
        playlist_category: category,
        playlist_image: thumbnailUrl,
        user_profile_link,
        user_profile_Image_link: user_Image
      };
    }));

    



  // Insert new playlists
  if (playlistDataToInsert.length > 0) {
    const { data, error } = await supabase.from('playlistsInfo').insert(playlistDataToInsert).select();
 
    if (error) {
      console.log(error, 'insertError');
      return [];
    }
   
  }

    // Update existing playlists
    if (playlistDataToUpdate.length > 0) {
      for (const playlistData of playlistDataToUpdate) {
        const { data, error } = await supabase.from('playlistsInfo').update(playlistData).eq('playlist_id', playlistData.playlist_id);
        if (error) {
          console.log(error, 'updateError');
          return [];
        }
        
      }
      
    }

  return [...playlistDataToInsert, ...playlistDataToUpdate];
}

export default addOrUpdatePlaylistData;
