import { PlaylistType } from "@/types/Types";
import SupabaseServerClient from "@/utils/supabase/server";
import playlists from "@/playlist.json"



const addPlaylistData = async(): Promise<PlaylistType[] | null> => {
const supabase = await SupabaseServerClient();

const{ data: {user}} = await supabase.auth.getUser();

if(!user){
    console.log('NO USER', user);
    return null;
}


// fetch exisiting playlist data

const {data: existingPlaylists, error: fetchError} = await supabase.from('playlistsInfo').select("*");

if(fetchError){
    console.log(fetchError, 'fetchError');
    return null
}

console.log(existingPlaylists, 'exisitngPlaylsit')

const existingPlaylistIds = existingPlaylists.map(playlist => playlist.playlist_id);
console.log(existingPlaylistIds, 'ids')

const newPlaylists = playlists.filter(playlist => !existingPlaylistIds.includes(playlist.id));

if(newPlaylists.length === 0){
    console.log("No New Playlsit added");
    return [];
}

const playlistData = newPlaylists.map(({name, id, user_Image, playlist_link, summary, title, category, user_profile_link, image,}) => ({
    playlist_id: id,
    user_name: name,
    playlist_url: playlist_link,
    playlist_summary: summary,
    playlist_title: title,
    playlist_category: category,
    playlist_image: image,
    user_profile_link,
    user_profile_Image_link: user_Image

}))

const {data, error} = await supabase.from('playlistsInfo').insert(playlistData).select();
if(error){
    
    return []
}
return data



}

export default addPlaylistData;