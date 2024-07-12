'use client'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import NameLogo from '@/public/name.png'
import useSupabaseClient from '@/utils/supabase/client';
import {User} from '@supabase/supabase-js'
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import getUserData from '@/app/actions/getUserData'
 import { usePathname } from 'next/navigation'

const Navbar =  () => {
const [user, setUser] = useState<User>();
const [isMounted, setIsMounted] = useState(false);
const supabase = useSupabaseClient();

const pathName = usePathname();



const handleSignout = async () =>{
  const {error} = await supabase.auth.signOut();
  if(!error) setUser(undefined)
}





 useEffect(() =>{
  const getCurrentUser = async() =>{
    const {data: {session},} = await supabase.auth.getSession();
    
    if(session){
      setUser(session.user)
    }
  };
  getCurrentUser();
 
  setIsMounted(true);

  // console.log(user, 'userdata')

 }, []);

 if(!isMounted) return null
const userProfile = user?.user_metadata?.avatar_url
console.log(userProfile, 'userProfile')



  return (
    <nav className="flex relative z-10 shadow-md items-center justify-around h-16 px-4  md:px-6 bg-[#12121b]">
      <Link className="flex items-center gap-2" href="#">
        <Image src={NameLogo} alt='Sieve' width={100} height={100}/>
      </Link>
      <nav className="md:flex md:items-center hidden gap-6 ">
        <Link  className={`${pathName == "/"? "text-white": "text-gray-400"}`} href="/" >
          Home
        </Link>
        <Link className={`${pathName == "/playlist"? "text-white": "text-gray-400"} hover:text-white`}  href="/playlist" >
          Playlist
        </Link>
        {!user && (
          <>
            <Link className={`${pathName == "/signup"? "text-white": "text-gray-400"} hover:text-white`} href="/signup" >
              Signup
            </Link>
            <Link className={`${pathName == "/login"? "text-white": "text-gray-400"} hover:text-white`}  href="/login" >
              Login
            </Link>
          </>
        )}
        {user && (
          <>
            <button className={"hover:text-white text-gray-400"}  onClick={handleSignout}>
              Logout
            </button>
            <Avatar>
              <AvatarImage src={userProfile} alt="profile" />
              <AvatarFallback>User Profile</AvatarFallback>
            </Avatar>
          </>
        )}
      </nav>
    </nav>
  );
}



export default Navbar