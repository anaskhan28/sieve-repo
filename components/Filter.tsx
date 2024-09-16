'use client'
import React, { useState, useCallback } from 'react'
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { usePathname } from 'next/navigation';
import playlists from '@/playlist.json'
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

type Props = {
  onFilter: (filter: string) => void;
}

const filterByCategory = Array.from(new Set(playlists.map((playlist) => playlist.category)));

const Filter = () => {
    const [activeArrow, setActiveArrow] = useState<'left' | 'right' | null>(null);
    const [activeButton, setActiveButton] = useState<string>("All");
    const [currentIndex, setCurrentIndex] = useState(0);
    const router = useRouter()

   const setFilter =(tag: string) => {
    if(tag){
        router.push("?tag=" + tag)
        setActiveButton(tag);
    }
    if(!tag){
        router.push("/playlist")
    }
   }

    const nextSlide = useCallback(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % filterByCategory.length);
        setActiveArrow('right');
        setTimeout(() => setActiveArrow(null), 300);
        setActiveButton("All")
        setFilter("")
        
    }, []);
    
    const prevSlide = useCallback(() => {
        setCurrentIndex((prevIndex) => 
            prevIndex === 0 ? filterByCategory.length - 1 : prevIndex - 1
        );
        setActiveArrow('left');
        setTimeout(() => setActiveArrow(null), 300);
        setActiveButton("All")
        setFilter("")
    }, []);
    
 

    return (
        <div className='container flex flex-row mt-2 mb-6 md:mb-0 md:mt-0 max-w-full md:max-w-7xl lg:max-w-8xl p-2 md:p-8 overflow-hidden items-center justify-between'>
            <ChevronLeft
                onClick={prevSlide}
                className={`cursor-pointer  w-9 h-9  p-2 rounded-md text-center text-white ${activeArrow === 'left' ? 'bg-[#766FFA]' : 'bg-[#878787]'}`}
                width={40}
                height={40}
            />
            <motion.div
              style={{
                maskImage:
                  'linear-gradient(to left, transparent 0%, black 20%, black 80%, transparent 95%)',
              }}
                className='flex gap-3 md:gap-5 justify-center items-center overflow-hidden w-[calc(100%-80px)]'
            >
                {[...filterByCategory, ...filterByCategory, ...filterByCategory].map((filter, index) => (
                    <motion.div
                        key={`${filter}-${index}`}
                        animate={{ x: -currentIndex * 120 }} // Adjust this value based on your button width
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        className={`text-white cursor-pointer bg-[#17191A] border border-[#555454] rounded-lg p-2 md:p-3 text-center whitespace-nowrap text-sm md:text-base ${activeButton === filter ? 'bg-[#766FFA]' : ''}`} 
                        onClick={() => setFilter(filter)}
                    >
                        {filter}
                    </motion.div>
                ))}
            </motion.div>
            <ChevronRight
                onClick={nextSlide}
                className={`cursor-pointer w-9 h-9 p-2 rounded-md text-center ${activeArrow === 'right' ? 'bg-[#766FFA]' : 'bg-[#878787]'} text-white`}
                width={40}
                height={40}
            />
        </div>
    )
}

export default Filter