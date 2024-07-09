"use server"
import { PlaylistType } from "@/types/Types";
import SupabaseServerClient from "@/utils/supabase/server";
import { PostgrestError } from "@supabase/supabase-js";
import { redirect } from "next/navigation";

const getPlaylistData = async (query?: any,filter?:any ): Promise<PlaylistType[] | null> => {
    const supabase = await SupabaseServerClient();
   
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        console.log('NO USER', user);
        return null;
    }

    const { data, error } = await supabase.from('playlistsInfo').select();
  
    if (query) {
        
        const { data, error } = await supabase.from('playlistsInfo').select().ilike('playlist_title', `%${query}%`).limit(10);
        console.log(data, 'query data');
      
        if (!data) {
            console.log("No Data", data);
            return null;
        }
        if (error) {
            console.log(error, 'error');
            return null;
        }
        return data
     
    }
    if (filter) {
        
        const { data, error } = await supabase.from('playlistsInfo').select().ilike('playlist_category', `%${filter}%`).limit(10);
        console.log(data, 'filter data');
      
        if (!data) {
            console.log("No Data", data);
            return null;
        }
        if (error) {
            console.log(error, 'error');
            return null;
        }
        return data
     
    }

    if (!data) {
        console.log("No Data", data);
        return null;
    }
    if (error) {
        console.log(error, 'error');
        return null ;
    }
    return data ?? [];
    
}

export default getPlaylistData;