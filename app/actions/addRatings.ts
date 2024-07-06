"use server"
import { RatingType } from '@/types/Types'
import SupabaseServerClient from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';



const addRatings = async (ratingType: RatingType): Promise<RatingType | null > => {
   const supabase = await SupabaseServerClient();

   const{ data: {user}} = await supabase.auth.getUser();
   if(!user){
    console.log('NO USER', user);
    return null;
}

const {data: alreadyRatedPlaylist, error: fetchError} = await supabase.from('ratings').select("*")

if(!alreadyRatedPlaylist) return null

if (fetchError) {
  console.log(fetchError, 'fetchError');
  return null;
}
const existingRatingPlaylist = alreadyRatedPlaylist.map(rated => rated.playlist_id);

if(existingRatingPlaylist.includes(ratingType.playlist_id)){
  const {data, error} = await supabase.from('ratings').update({
    rating: ratingType.rating,
    playlist_id: ratingType.playlist_id,
    user_id: ratingType.user_id
  }).eq('playlist_id', ratingType.playlist_id).select();
  revalidatePath('/playlist')

  if(error){
    console.log(error, 'updateError');
    return null
  }
  if(!data) return null
  return data ? data[0] : null
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

revalidatePath('/playlist')
  
  return data ? data[0] : null








}

export default addRatings