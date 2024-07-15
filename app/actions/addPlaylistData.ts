"use server"
import { PlaylistType } from "@/types/Types";
import SupabaseServerClient from "@/utils/supabase/server";
import playlists from "@/playlist.json";
import { getThumbnailUrl } from './fetchThumbnails';

interface JsonPlaylist {
  id: number;
  name: string;
  playlist_link: string;
  summary: string;
  title: string;
  category: string;
  user_profile_link: string;
  user_Image: string;
}

const addOrUpdatePlaylistData = async (): Promise<{ upserted: PlaylistType[] } | null> => {
  const supabase = await SupabaseServerClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    console.error('No user found');
    return null;
  }

  const playlistsToUpsert: PlaylistType[] = [];

  for (const playlist of playlists as JsonPlaylist[]) {
    const thumbnailUrl = await getThumbnailUrl(playlist.playlist_link);

    const playlistData: PlaylistType = {
      playlist_id: playlist.id,
      user_name: playlist.name,
      playlist_url: playlist.playlist_link,
      playlist_summary: playlist.summary,
      playlist_title: playlist.title,
      playlist_category: playlist.category,
      playlist_image: thumbnailUrl,
      user_profile_link: playlist.user_profile_link,
      user_profile_image_link: playlist.user_Image
    };

    playlistsToUpsert.push(playlistData);
  }

  if (playlistsToUpsert.length === 0) {
    console.log("No playlists to upsert");
    return { upserted: [] };
  }

  // Upsert all playlists
  const { error: upsertError } = await supabase
    .from('playlistsInfo')
    .upsert(playlistsToUpsert, { onConflict: 'playlist_id' });

  if (upsertError) {
    console.error('Error upserting playlists:', upsertError);
    return null;
  }

  return { upserted: playlistsToUpsert };
}

export default addOrUpdatePlaylistData;