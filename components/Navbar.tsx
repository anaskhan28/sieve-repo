import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import NameLogo from '@/public/name.png'

const Navbar = () => {
  return (
    <nav className="flex relative z-10 shadow-md items-center justify-around h-16 px-4 md:px-6 bg-[#12121b]">
      <Link className="flex items-center gap-2" href="#">
        <Image src={NameLogo} alt='Sieve' width={100} height={100}/>
       
      </Link>
      <nav className="md:flex md:items-center hidden gap-6 ">
        <Link className="text-white hover:text-gray-200 dark:text-gray-400 dark:hover:text-gray-200" href="#">
          Home
        </Link>
        <Link className="text-gray-400 hover:text-gray-200 dark:text-gray-400 dark:hover:text-gray-200" href="#">
          Playlist
        </Link>
        <Link className="text-gray-400 hover:text-gray-200 dark:text-gray-400 dark:hover:text-gray-200" href="#">
          Signup
        </Link>
        <Link className="text-gray-400 hover:text-gray-200 dark:text-gray-400 dark:hover:text-gray-200" href="#">
          Login
        </Link>
      
        <button>
            
        </button>
      </nav>
    </nav>
  )
}



export default Navbar