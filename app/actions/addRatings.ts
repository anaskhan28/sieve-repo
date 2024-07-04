"use server"
import { RatingType } from '@/types/Types'
import SupabaseServerClient from '@/utils/supabase/server'
import { redirect } from 'next/navigation';



const addRatings = async (ratingType: RatingType): Promise<RatingType | null > => {
   const supabase = await SupabaseServerClient();

   const{ data: {user}} = await supabase.auth.getUser();
   if(!user){
    console.log('NO USER', user);
    return null;
}


const {data, error} = await supabase.from('ratings').insert({
    rating: ratingType.rating,
    playlist_id: ratingType.playlist_id,
    user_id: ratingType.user_id
}).select();

if (error) {
    console.log(error, 'updateError');
    return null;
  }

  if(!data) return null
  
  return data ? data[0] : null

redirect('/playlist')






}

export default addRatings