

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

    if (query) {
        queryBuilder = queryBuilder.ilike('playlist_title', `%${query}%`);
    }

    if (filter) {
        queryBuilder = queryBuilder.ilike('playlist_category', `%${filter}%`);
    }

    // Add sorting if needed
    // queryBuilder = queryBuilder.order('created_at', { ascending: false });

    // Limit the results
    queryBuilder = queryBuilder.limit(10);

    const { data, error } = await queryBuilder;

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