'use server'
import { RatingType } from "@/types/Types";
import SupabaseServerClient from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

const getRatings = async(): Promise<RatingType[] | null> => {
const supabase = await SupabaseServerClient();


const{ data: {user}} = await supabase.auth.getUser();

if(!user){
    console.log('NO USER', user);
    return null;
}
const {data, error} = await supabase.from('ratings').select().eq('user_id', user.id);
if(error){
    console.log(error, 'error');
    return null
}
console.log(data, 'get rating data')
revalidatePath('/')
return data
}

export default getRatings;

