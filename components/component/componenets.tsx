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

 
export function NavbarSlide() {
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
            <button className={"hover:text-white text-gray-400"}  onClick={handleSignout}>
              Logout
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
      
      <div className="fixed bottom-0 left-0 z-10 flex w-full items-center justify-around bg-[#12121b] py-3 shadow-t dark:bg-gray-950 lg:hidden">
        <Link
          href="/"
          className="flex flex-col items-center gap-1 text-xs font-medium text-gray-500 hover:text-gray-400 dark:text-gray-400 dark:hover:text-gray-50"
          prefetch={false}
        >
          <Home className="h-6 w-6" />
          Home
        </Link>
        <Link
          href="/playlist"
          className="flex flex-col items-center gap-1 text-xs font-medium text-gray-500 hover:text-gray-400 dark:text-gray-400 dark:hover:text-gray-50"
          prefetch={false}
        >
          <Youtube className="h-6 w-6" />
          Playlists
        </Link>
        
          {!user && (
            <>
            <Link
          href="/signup"
          className="flex flex-col items-center gap-1 text-xs font-medium text-gray-500 hover:text-gray-400 dark:text-gray-400 dark:hover:text-gray-50"
          prefetch={false}
        >
<CircleUserRound className="h-6 w-6" />
          Signup
        
        </Link>

        <Link
          href="/login"
          className="flex flex-col items-center gap-1 text-xs font-medium text-gray-500 hover:text-gray-400 dark:text-gray-400 dark:hover:text-gray-50"
          prefetch={false}
        >
          <LogIn className="h-6 w-6" />
          Login
        </Link>
            </>
          )}
          {user && (
            <>
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

function BriefcaseIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
      <rect width="20" height="14" x="2" y="6" rx="2" />
    </svg>
  )
}


function HomeIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  )
}


function InfoIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M12 16v-4" />
      <path d="M12 8h.01" />
    </svg>
  )
}


function MailIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  )
}


function MountainIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
  )
}


function SearchIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  )
}
