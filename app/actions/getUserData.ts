"use server"
import { User } from "@/types/Types";
import SupabaseServerClient from "@/utils/supabase/server";


const getUserData = async(): Promise<User | null> => {
const supabase = await SupabaseServerClient();

const{ data: {user}} = await supabase.auth.getUser();

if(!user){
    console.log('NO USER', user);
    return null;
}
const {data, error} = await supabase.from('users').select('*').eq('id', user.id);
console.log(data, 'data')
if(error){
    console.log(error, 'error');
    return null
}
return data ? data[0] :null;
}

export default getUserData;