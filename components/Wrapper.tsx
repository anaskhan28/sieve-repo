"use client";

import { useState, useEffect, Suspense, lazy } from 'react';
import { useDebounce } from 'use-debounce';
import Search from './Search';
import Filter from './Filter';
import Loading from './loading';
import Image from 'next/image';
import { PlaylistType } from "@/types/Types";

const PlaylistCard = lazy(() => import('./PlaylistCard'));

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
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    const filtered = initialData.filter(item => 
      item.playlist_title.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) &&
      (filterTerm === 'All' || item.playlist_category === filterTerm)
    );
    setFilteredData(filtered);
    setIsLoading(false);
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
      
      {isLoading ? (
        <div className="flex justify-center items-center">
    <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-purple-500"></div>
  </div>      ) : filteredData.length > 0 ? (
        <div className='grid grid-cols-1 md:grid-cols-3 gap-8 mb-2 w-full max-w-7xl'>
          {filteredData.map(playlist => (
            <Suspense key={playlist.id} fallback={<Loading />}>
              <PlaylistCard {...playlist} />
            </Suspense>
          ))}
        </div>
      ) : (
        <div className='flex flex-col gap-7 justify-center items-center p-8'>
          <p className='w-full text-center text-md  text-gray-100'>No Playlist Found </p>
          <Image className='' src="/not-found.svg" alt='not-found' width={150} height={150}/>
        </div>
      )}
    </>
  );
};

export default ClientSideSearchWrapper;