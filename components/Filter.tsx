'use client'
import React, { useState, useRef, useEffect, useCallback } from 'react'
import { ChevronRight } from 'lucide-react';
import { ChevronLeft } from 'lucide-react';
import { usePathname } from 'next/navigation';

type Props = {
  onFilter: (filter: string) => void;
}

const filterByCategory = [
    "All",  // Add an "All" option
    "Frontend Development",
    "Backend Development",
    "Android Development",
    "Data Structures",
    "Machine Learning",
    "Open Source",
    "UI UX Design",
    "Frontend Development",
    "Backend Development",
    "Android Development",
    "Data Structures",
    "Machine Learning",
    "Open Source",
    "UI UX Design",
]

const Filter = ({ onFilter }: Props) => {
    const [activeArrow, setActiveArrow] = useState<'left' | 'right' | null>(null);
    const [activeButton, setActiveButton] = useState<string>("All");  // Set initial state to "All"
    const containerRef = useRef<HTMLDivElement>(null);
    const path = usePathname();

    const handleScroll = useCallback((direction: 'left' | 'right') => {
        setActiveArrow(direction);
        setTimeout(() => setActiveArrow(null), 300);
        
        if (containerRef.current) {
            const container = containerRef.current;
            const scrollAmount = container.clientWidth / 2;

            container.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });

            setTimeout(() => {
                if (direction === 'left' && container.scrollLeft === 0) {
                    container.scrollTo({ left: container.scrollWidth, behavior: 'smooth' });
                } else if (direction === 'right' && container.scrollLeft + container.clientWidth >= container.scrollWidth) {
                    container.scrollTo({ left: 0, behavior: 'smooth' });
                }
            }, 300);
        }
    }, []);

    

    const handleFilterClick = (filter: string) => {
        setActiveButton(filter);
        onFilter(filter);
    }

    return (
        <div className='container hidden md:flex max-w-7xl p-8 overflow-hidden flex-row justify-center items-center gap-5'>
            <ChevronLeft
                onClick={() => handleScroll("left")}
                className={`absolute left-12 ml-5 cursor-pointer p-2 rounded-sm text-center text-white ${activeArrow === 'left' ? 'bg-[#766FFA]' : 'bg-[#878787]'}`}
                width={50}
                height={50}
            />
            <div ref={containerRef} className='flex gap-5 cursor-pointer w-full justify-center items-center overflow-hidden'>
                {filterByCategory.map((filter) => (
                    <button 
                        type='button' 
                        className={`text-white cursor-pointer bg-[#17191A] border border-[#555454] rounded-lg p-4 text-center w-60 whitespace-nowrap ${activeButton === filter ? 'bg-[#766FFA]' : ''}`} 
                        key={filter}
                        onClick={() => handleFilterClick(filter)}
                    >
                        {filter}
                    </button>
                ))}
            </div>
            <ChevronRight
                onClick={() => handleScroll("right")}
                className={`absolute right-12 mr-5 p-2 cursor-pointer rounded-sm text-center ${activeArrow === 'right' ? 'bg-[#766FFA]' : 'bg-[#878787]'} text-white`}
                width={50}
                height={50}
            />
        </div>
    )
}

export default Filter
