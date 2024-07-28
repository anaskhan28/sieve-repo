"use client";

import { useState, useEffect, Suspense } from 'react';
import { useDebounce } from 'use-debounce';
import Search from './Search';
import Filter from './Filter';
import PlaylistCard from './PlaylistCard';
import { PlaylistType } from "@/types/Types";
import Loading from './loading';
import Image from 'next/image';
type EnrichedPlaylistType = PlaylistType & {
  playlistRating: number | null;
  avgPlaylistRate: string | null;
};

type Props = {
  initialData: EnrichedPlaylistType[];
};

const ClientSideSearchWrapper = ({ initialData }: Props) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterTerm, setFilterTerm] = useState('All');
  const [debouncedSearchTerm] = useDebounce(searchTerm, 300);
  const [filteredData, setFilteredData] = useState(initialData);

  useEffect(() => {
    const filtered = initialData.filter(item => 
      item.playlist_title.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) &&
      (filterTerm === 'All' || item.playlist_category === filterTerm)
    );
    setFilteredData(filtered);
    
  }, [debouncedSearchTerm, filterTerm, initialData]);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  
  };

  const handleFilter = (term: string) => {
    setFilterTerm(term);
  };

  return (
    <>
      <Search onSearch={handleSearch} />
      <Filter onFilter={handleFilter} />
      
        
      {filteredData.length > 0 ? (
        <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
          {filteredData.map(playlist => (
            <PlaylistCard key={playlist.id} {...playlist} />
          ))}
        </div>
      ) : (
        <div className='flex flex-col gap-7 justify-center items-center p-8'>
          <p className='w-full text-center text-md md:text-xl text-gray-100'>No Playlist Found </p>
          <Image className='' src="/not-found.svg" alt='not-found' width={150} height={150}/>
        </div>
      )}
    
    
    </>
  );
};

export default ClientSideSearchWrapper;