"use client"
import Image from 'next/image';
import React from 'react'
import Link from 'next/link';
import useSupabaseClient from '@/utils/supabase/client';
import { Provider } from '@supabase/supabase-js';
type Props = {}

const Signup = (props: Props) => {

 
    const supabase = useSupabaseClient();


 const socialAuth =  async (provider: Provider) =>{
  await supabase.auth.signInWithOAuth({
    provider,
    options: {
    redirectTo: `${location.origin}/auth/callback`,
    }
  })
 }


  return (
    <div className=' flex flex-col md:flex-row 
    justify-center  md:justify-between
    items-center  w-full'>
        <div className='hidden 
        md:flex flex-col 
         w-1/2 bg-[#F7FAFC] h-screen p-6 '>
        <Link href="/"><Image src='/sieve.svg' className='h-12' width={150} height={150} alt='sieve'/>
</Link>
            <div className='flex justify-center items-center h-full w-full'>
            <Image src='/signup.svg' className='' width={400} height={330} alt='sieve'/>

            </div>
        </div>

        <div className='flex flex-col gap-8 md:gap-16 md:p-12 mt-[12rem] md:mt-[7rem] justify-center md:justify-between items-center md:w-1/2'>
            <div className='flex flex-col gap-1 px-8 md:px-24  md:mt-[-12rem]'>
                <span className='md:text-lg text-md font-light space-x-2'>Welcome  to Sieve</span>
                <h1 className='text-lg md:text-2xl font-bold '>Start a journey with us</h1>
            </div>
            <div className='flex flex-col gap-4'>
            <button
            onClick={socialAuth.bind(this, "google" )}
            // onClick={loginWithGoogle}
            className='flex justify-center items-center gap-3 
             py-2 px-16 bg-[#A4A0EE] hover:bg-[#8a86d5] text-white rounded-md text-md font-light text-center'>
                <Image src='/google.svg' width={20} height={20} alt='google'/>
                Start with Google</button>
            <button
            // onClick={loginWithGitHub}
            onClick={socialAuth.bind(this, "github")}
            className='flex justify-center items-center gap-3
             py-2 px-16 bg-[#51505c] hover:hover:bg-[#393D44] text-white rounded-md text-md font-light text-center'>
                <Image src='/github.png' width={25} height={20} alt='github'/>
                Start with GitHub</button>
                <span className='text-center font-light text-md '>Already? <Link href="/login" className='text-blue-600 hover:underline hover:underline-offset-3
'>Continue Now</Link></span>
            </div>
            
        </div>
        
           
        

    </div>
  )
}

export default Signup;