import { PlaylistType } from "@/types/Types";
import SupabaseServerClient from "@/utils/supabase/server";


const getPlaylistData = async(): Promise<PlaylistType[] | null> => {
const supabase = await SupabaseServerClient();


const{ data: {user}} = await supabase.auth.getUser();

if(!user){
    console.log('NO USER', user);
    return null;
}
const {data, error} = await supabase.from('playlistsInfo').select();

if(error){
    console.log(error, 'error');
    return null
}

return data ?? [];
}

export default getPlaylistData;