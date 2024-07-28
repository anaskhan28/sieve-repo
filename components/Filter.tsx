'use client'
import React, { useState, useRef, useEffect, useCallback } from 'react'
import { ChevronRight } from 'lucide-react';
import { ChevronLeft } from 'lucide-react';
import { usePathname } from 'next/navigation';
import playlists from '@/playlist.json'

type Props = {
    onFilter: (filter: string) => void;
}

const filterByCategory = ["All", ...Array.from(new Set(playlists.map((playlist) => playlist.category)))];

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
        setActiveButton("All")
        onFilter("All")

    }, [onFilter]);

    const handleFilterClick = (filter: string) => {
        setActiveButton(filter);
        onFilter(filter);
    }

    return (
        <div ref={containerRef} className='hidden md:flex flex-wrap gap-3 pt-5 cursor-pointer w-full justify-center items-center'>
            {filterByCategory.map((filter) => (
                <>
                    <button
                        type='button'
                        className={`text-white cursor-pointer rounded-md font-bold bg-[#3f3f3f]  p-1 px-3 text-center text-nowrap ${activeButton === filter ? 'bg-[#766FFA]' : ''}`}
                        key={filter}
                        onClick={() => handleFilterClick(filter)}
                    >
                        {filter}
                    </button>
                </>
            ))}
        </div>
    )
}

export default Filter
