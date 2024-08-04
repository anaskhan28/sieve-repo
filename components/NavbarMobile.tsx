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
 import { usePathname } from 'next/navigation'

 import { Youtube, Home, LogOut, CircleUserRound, LogIn } from 'lucide-react';

 
export function NavbarMobile() {
  const [user, setUser] = useState<User>();
const [isMounted, setIsMounted] = useState(false);
const supabase = useSupabaseClient();

const pathName = usePathname();



const handleSignout = async () =>{
  const {error} = await supabase.auth.signOut();
  if(!error) setUser(undefined)
    window.location.reload();

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
      <>
      <nav className="flex relative z-10 shadow-md items-center justify-around h-16 px-4 md:px-6 bg-[#12121b]">
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
           
            <Link className={`${pathName == "/playlist/rated-playlist"? "text-white": "text-gray-400"} hover:text-white`}  href="/playlist/rated-playlist" >
              Rated Playlists
            </Link>
            <Link className={`text-gray-400 hover:text-white`}  href="https://github.com/anaskhan28/sieve-repo" >
              Contribute
            </Link>

            <button className="group/button relative inline-flex h-7 w-7 items-center justify-center overflow-hidden rounded-full bg-[#756df4] font-medium text-white transition-all duration-300 hover:w-24">
      <p onClick={handleSignout}  className="inline-flex whitespace-nowrap text-xs opacity-0 transition-all duration-200 group-hover/button:-translate-x-2.5 group-hover/button:opacity-100">
        Logout
      </p>
      <div className="absolute right-1.5">
        <svg
          viewBox="0 0 15 15"
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4 fill-white"
        >
          <path d="M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z"></path>
        </svg>
      </div>
    </button>
          
            <Avatar>
              <AvatarImage src={userProfile} alt="profile" />
              <AvatarFallback>
                <Image src="/default-profile.jpg" alt='profile' width={100} height={100}/>
              </AvatarFallback>
            </Avatar>

 
          </>
        )}
      </nav>
    </nav>
      
      <div className="fixed bottom-0 left-0 z-10 flex w-full items-center justify-around bg-[#12121b] bg-opacity-80 backdrop-filter backdrop-blur-lg py-3 dark:bg-gray-950 lg:hidden">
      
        <Link
          href="/playlist"
         className={`${pathName == "/playlist"? "text-white": "text-gray-400"} flex flex-col items-center gap-1 text-xs font-medium text-gray-500 hover:text-gray-400 dark:text-gray-400 dark:hover:text-gray-50`}
          prefetch={false}
        >
          
          <Home className="h-6 w-6" />

          Playlists
        </Link>
        
          {!user && (
            <>
            <Link
          href="/signup"
         className={`${pathName == "/signup"? "text-white": "text-gray-400"} flex flex-col items-center gap-1 text-xs font-medium text-gray-500 hover:text-gray-400 dark:text-gray-400 dark:hover:text-gray-50`}
          prefetch={false}
        >
<CircleUserRound className="h-6 w-6" />
          Signup
        
        </Link>

        <Link
          href="/login"
        className={`${pathName == "/login"? "text-white": "text-gray-400"} flex flex-col items-center gap-1 text-xs font-medium text-gray-500 hover:text-gray-400 dark:text-gray-400 dark:hover:text-gray-50`}
          prefetch={false}
        >
          <LogIn className="h-6 w-6" />
          Login
        </Link>
            </>
          )}
          {user && (
            <>

<Link
          href="/playlist/rated-playlist"
          className={`${pathName == "/playlist/rated-playlist"? "text-white": "text-gray-400"} flex flex-col items-center gap-1 text-xs font-medium text-gray-500 hover:text-gray-400 dark:text-gray-400 dark:hover:text-gray-50`}
          prefetch={false}
        >
<Youtube className="h-6 w-6" />
          Rated Playlists
        
        </Link>
<Link
          href="https://github.com/anaskhan28/sieve-repo" target='_blank'
          className="flex flex-col items-center gap-1 text-xs font-medium text-gray-500 hover:text-gray-400 dark:text-gray-400 dark:hover:text-gray-50"
          prefetch={false}
        >
<CircleUserRound className="h-6 w-6" />
          Contribute
        
        </Link>
            <button
            onClick={handleSignout}
          
          className="flex flex-col items-center gap-1 text-xs font-medium text-gray-500 hover:text-gray-400 dark:text-gray-400 dark:hover:text-gray-50"
        
        >
<LogOut className="h-6 w-6" />
              Logout
            
        
        </button>

        <Link
          href="#"
          className="flex flex-col items-center gap-1 text-xs font-medium text-gray-500 hover:text-gray-400 dark:text-gray-400 dark:hover:text-gray-50"
          prefetch={false}
        >
            <Avatar>
              <AvatarImage src={userProfile} alt="profile" />
              <Image src="/default-profile.jpg" alt='profile' width={100} height={100}/>
              </Avatar>
          
        </Link>
            </>
          )}

          
         
       
      </div>
    </>
  )
}

