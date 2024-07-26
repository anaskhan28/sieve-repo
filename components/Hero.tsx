// components/Hero.tsx
import React from 'react';
import Image from 'next/image';
import Background from '@/public/logos.svg'
import Link from 'next/link';
import {ArrowUpRight} from 'lucide-react'
import getUserData from '@/app/actions/getUserData';
import TypingAnimation from './typing-animation';

const Hero: React.FC = async() => {
const userData = await getUserData();



  return (
    <section className="bg-[#12121b] relative  min-h-screen flex flex-col items-center justify-center">
<main className="w-full relative z-10 py-12 md:py-16 lg:py-20">
        <div className="container gap-4 flex flex-col items-center mx-auto px-4 md:px-6 text-center">
          <span className='text-[#A799FF] font-bold text-xl mb-6 text-center'>Welcome to the Sieve</span>
          <TypingAnimation
          className='className="tagline font-black text-3xl  text-gray-50 max-w-2xl tracking-wider sm:text-xl md:text-3xl lg:text-5xl'
          text='Curate, Rate, and Master Your Tech Learning'
          duration={100}
          />
         
          <p className="mt-4 text-md md:text-lg text-gray-400 max-w-2xl mx-auto">
          Your Gateway to the Best Tech Learning Playlists. Sieve is the IMDB for YouTube learning, helping you find the best content effortlessly
          </p>
          <button className="group/button relative overflow-hidden border-purple-300 bg-white
          transition-all duration-150 hover:border-purple-500 active:scale-95
          rounded-lg 
          mt-8 flex justify-center items-center">
             <span className="absolute bottom-0 left-0 z-0 h-0 w-full 
             bg-gradient-to-t from-purple-600 to-purple-500 transition-all
              duration-500 group-hover/button:h-full" />
            <Link
              className="inline-flex text-center items-center h-14  px-4
              relative z-10 transition-all duration-500 group-hover/button:text-white
               text-[#5C5DC2] text-lg md:text-xl font-medium"
              href={userData ? '/playlist': '/signup'}
            >
              Get Started <ArrowUpRight className='ml-1 text-[#5C5DC2] group-hover/button:text-white
          ' width={30} height={30}/>
            </Link>
          </button>
       
        </div>
      </main>
       
    </section>
  );
};

export default Hero;
