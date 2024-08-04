'use client'
import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import NameLogo from '@/public/name.png'
import useSupabaseClient from '@/utils/supabase/client'
import { User } from '@supabase/supabase-js'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { usePathname } from 'next/navigation'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [user, setUser] = useState<User>()
  const [isMounted, setIsMounted] = useState(false)
  const supabase = useSupabaseClient()
  const pathName = usePathname()

  useEffect(() => {
    const getCurrentUser = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (session) {
        setUser(session.user)
      }
    }
    getCurrentUser()
    setIsMounted(true)
  }, [])

  if (!isMounted) return null

  const handleSignout = async () => {
    const { error } = await supabase.auth.signOut()
    if (!error) setUser(undefined)
  }

  const userProfile = user?.user_metadata?.avatar_url

  return (
    <>
      {/* Desktop Navbar */}
      <nav className="flex relative z-10 shadow-md items-center justify-around h-16 px-4 md:px-6 bg-[#12121b]">
        <Link className="flex items-center gap-2" href="#">
          <Image src={NameLogo} alt='Sieve' width={100} height={100} />
        </Link>
        <div className="md:flex md:items-center hidden gap-6">
          <Link className={`${pathName == "/" ? "text-white" : "text-gray-400"}`} href="/">
            Home
          </Link>
          <Link className={`${pathName == "/playlist" ? "text-white" : "text-gray-400"} hover:text-white`} href="/playlist">
            Playlist
          </Link>
          <Link className="text-gray-400 hover:text-white" href="https://github.com/anaskhan28/sieve-repo">
            Contribute
          </Link>
          {!user && (
            <>
              <Link className={`${pathName == "/signup" ? "text-white" : "text-gray-400"} hover:text-white`} href="/signup">
                Signup
              </Link>
              <Link className={`${pathName == "/login" ? "text-white" : "text-gray-400"} hover:text-white`} href="/login">
                Login
              </Link>
            </>
          )}
          {user && (
            <>
            
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
                <AvatarFallback>User Profile</AvatarFallback>
              </Avatar>
            </>
          )}
        </div>
      </nav>

      {/* Mobile Navbar */}
      <nav className="md:hidden bg-[#12121b] fixed w-full top-0 left-0 z-50 shadow-md">
        <div className="flex justify-between items-center p-4">
          <Link className="flex items-center gap-2" href="#">
            <Image src={NameLogo} alt='Sieve' width={100} height={100} />
          </Link>
          <button onClick={() => setIsOpen(!isOpen)} className='text-white'>
            {isOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: "-100%" }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: "-100%" }}
              transition={{ duration: 0.3 }}
              className="bg-[#12121b] text-white p-4"
            >
              <div className="flex flex-col gap-4">
                <Link className={`${pathName == "/" ? "text-white" : "text-gray-400"}`} href="/">
                  Home
                </Link>
                <Link className={`${pathName == "/playlist" ? "text-white" : "text-gray-400"} hover:text-white`} href="/playlist">
                  Playlist
                </Link>
                <Link className="text-gray-400 hover:text-white" href="https://github.com/anaskhan28/sieve-repo">
            Contribute
          </Link>
                {!user && (
                  <>
                    <Link className={`${pathName == "/signup" ? "text-white" : "text-gray-400"} hover:text-white`} href="/signup">
                      Signup
                    </Link>
                    <Link className={`${pathName == "/login" ? "text-white" : "text-gray-400"} hover:text-white`} href="/login">
                      Login
                    </Link>
                 
                  </>
                )}
                {user && (
                  <>
                    <button className="hover:text-white hover:bg-[#756df4] font-bold text-md bg-white p-3 rounded-lg text-[#756df4]" onClick={handleSignout}>
                      Logout
                    </button>
                    
                  </>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  )
}

export default Navbar

