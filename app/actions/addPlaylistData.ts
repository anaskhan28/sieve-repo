"use server"
import { PlaylistType } from "@/types/Types";
import SupabaseServerClient from "@/utils/supabase/server";
import playlists from "@/playlist.json";
import { getThumbnailUrl } from './fetchThumbnails';

interface JsonPlaylist {
  id?: number;
  name: string;
  playlist_link: string;
  summary: string;
  title: string;
  category: string;
  user_profile_link: string;
  user_Image: string;
}

const addOrUpdatePlaylistData = async (): Promise<{ upserted: PlaylistType[], skipped: number } | null> => {
  const supabase = await SupabaseServerClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    console.error('No user found');
    return null;
  }

  // Fetch all existing playlists from the database
  const { data: existingPlaylists, error: fetchError } = await supabase
    .from('playlistsInfo')
    .select('*');

  if (fetchError) {
    console.error('Error fetching existing playlists:', fetchError);
    return null;
  }

  const existingPlaylistMap = new Map(existingPlaylists.map(p => [p.playlist_url, p]));

  const playlistsToUpsert: PlaylistType[] = [];
  let skippedCount = 0;

  for (const playlist of playlists as JsonPlaylist[]) {
    const existingPlaylist = existingPlaylistMap.get(playlist.playlist_link);
    console.log(existingPlaylist, 'existing')
    const thumbnailUrl = await getThumbnailUrl(playlist.playlist_link);

    const playlistData: PlaylistType = {
      // playlist_id: playlist.id,
      user_name: playlist.name,
      playlist_url: playlist.playlist_link,
      playlist_summary: playlist.summary,
      playlist_title: playlist.title,
      playlist_category: playlist.category,
      playlist_image: thumbnailUrl,
      user_profile_link: playlist.user_profile_link,
      user_profile_image_link: playlist.user_Image
    };

    if (!existingPlaylist || hasChanges(existingPlaylist, playlistData)) {
      playlistsToUpsert.push(playlistData);
    } else {
      skippedCount++;
    }
  }

  if (playlistsToUpsert.length === 0) {
    console.log("No playlists to add or update. Data is up to date.");
    return { upserted: [], skipped: skippedCount };
  }

  // Upsert playlists
  const { error: upsertError } = await supabase
    .from('playlistsInfo')
    .upsert(playlistsToUpsert, { onConflict: 'id' });

  if (upsertError) {
    console.error('Error upserting playlists:', upsertError);
    return null;
  }
  
  return { upserted: playlistsToUpsert, skipped: skippedCount };
}

function hasChanges(existing: PlaylistType, updated: PlaylistType): boolean {
  return Object.keys(updated).some(key => {
    if (key === 'playlist_image') {
      // Skip comparison for playlist_image as it's dynamically fetched
      return false;
    }
    return existing[key as keyof PlaylistType] !== updated[key as keyof PlaylistType];
  });
}

export default addOrUpdatePlaylistData;