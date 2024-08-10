
"use server"
import { PlaylistType } from "@/types/Types";
import SupabaseServerClient from "@/utils/supabase/server";

const getPlaylistData = async (query?: string, filter?: string): Promise<PlaylistType[] | null> => {
    const supabase = await SupabaseServerClient();
   
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        console.log('NO USER', user);
        return null;
    }

    let queryBuilder = supabase
        .from('playlistsInfo')
        .select('*');

    // Add sorting if needed
    queryBuilder = queryBuilder.order('inserted_at', { ascending: true });
  
    // Limit the results
    // queryBuilder = queryBuilder.limit(20);

    const { data, error } = await queryBuilder;
    // console.log(data, 'data')
    if (error) {
        console.log(error, 'error');
        return null;
    }

    if (!data) {
        console.log("No Data", data);
        return null;
    }

    return data ;
}

export default getPlaylistData;
