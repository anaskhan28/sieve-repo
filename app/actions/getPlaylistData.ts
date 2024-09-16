"use server"
import { PlaylistType } from "@/types/Types";
import SupabaseServerClient from "@/utils/supabase/server";

const getPlaylistData = async (): Promise<{ data: PlaylistType[] | null; totalCount: number }> => {
    try {
        const supabase = await SupabaseServerClient();
       
        const { data: { user } } = await supabase.auth.getUser();
    
        if (!user) {
            console.log('NO USER', user);
            return { data: null, totalCount: 0 };
        }
    
        let queryBuilder = supabase
            .from('playlistsInfo')
            .select('*', { count: 'exact' });
    
        // Add sorting
        queryBuilder = queryBuilder.order('inserted_at', { ascending: false });
    
        const { data, error, count } = await queryBuilder;

        if (error) {
            console.log(error, 'error');
            throw error;
        }
    
        if (!data || data.length === 0) {
            console.log("No Data", data);
            return { data: null, totalCount: 0 };
        }
        console.log(data, 'data')
    
        return { data, totalCount: count ?? 0 };
    } catch (error) {
        console.log(error, 'error');
        throw error;
    }
}

export default getPlaylistData;