import { User } from "@/types/User";
import SupabaseServerClient from "@/utils/supabase/server";


const getUserData = async(): Promise<User | null> => {
const supabase = await SupabaseServerClient();

const{ data: {user}} = await supabase.auth.getUser();

if(!user){
    console.log('NO USER', user);
    return null;
}
const {data, error} = await supabase.from('users').select('*').eq('id', user.id);

if(error){
    console.log(error);
    return null;
}
return data ? data[0] :null;
}

export default getUserData;