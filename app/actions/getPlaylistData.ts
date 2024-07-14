"use server"
import { PlaylistType } from "@/types/Types";
import SupabaseServerClient from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { cache } from 'react';

// Function to fetch all playlist data
const fetchAllPlaylistData = cache(async (): Promise<PlaylistType[] | null> => {
    const supabase = await SupabaseServerClient();
   
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        console.log('NO USER', user);
        return null;
    }

    const { data, error } = await supabase.from('playlistsInfo').select();

    if (error) {
        console.log(error, 'error');
        return null;
    }

    if (!data || data.length === 0) {
        console.log("No Data", data);
        return null;
    }

    return data;
});


const getPlaylistData = async (query?: string, filter?: string): Promise<PlaylistType[] | null> => {
    const allData = await fetchAllPlaylistData();

    if (!allData) return null;

    let filteredData = allData;

    if (query) {
        filteredData = filteredData.filter(playlist => 
            playlist.playlist_title.toLowerCase().includes(query.toLowerCase())
        );
    }else{
        console.log('no data')
    }

    if (filter) {
        filteredData = filteredData.filter(playlist => 
            playlist.playlist_category!.toLowerCase().includes(filter.toLowerCase())
        );
    }else{
        console.log('no data')
    }

    revalidatePath('/playlist');
    return filteredData.slice(0, 10); // Limit to 10 results to match previous behavior
};

export default getPlaylistData;




// "use server"
// import { PlaylistType } from "@/types/Types";
// import SupabaseServerClient from "@/utils/supabase/server";

// const getPlaylistData = async (query?: string, filter?: string): Promise<PlaylistType[] | null> => {
//     const supabase = await SupabaseServerClient();
   
//     const { data: { user } } = await supabase.auth.getUser();

//     if (!user) {
//         console.log('NO USER', user);
//         return null;
//     }

//     let queryBuilder = supabase
//         .from('playlistsInfo')
//         .select('*');

//     if (query) {
//         queryBuilder = queryBuilder.ilike('playlist_title', `%${query}%`);
//     }

//     if (filter) {
//         queryBuilder = queryBuilder.ilike('playlist_category', `%${filter}%`);
//     }

//     // Add sorting if needed
//     // queryBuilder = queryBuilder.order('created_at', { ascending: false });

//     // Limit the results
//     queryBuilder = queryBuilder.limit(10);

//     const { data, error } = await queryBuilder;

//     if (error) {
//         console.log(error, 'error');
//         return null;
//     }

//     if (!data || data.length === 0) {
//         console.log("No Data", data);
//         return null;
//     }

//     return data ;
// }

// export default getPlaylistData;