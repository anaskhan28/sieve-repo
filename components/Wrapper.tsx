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
  inserted_at: string | null; // Assuming there's a inserted_at field, add it if not present
};

type Props = {
  initialData: EnrichedPlaylistType[];
};

type SortOption = 'rating' | 'newest' | 'oldest';

const ClientSideSearchWrapper = ({ initialData }: Props) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterTerm, setFilterTerm] = useState('All');
  const [sortOption, setSortOption] = useState<SortOption>('rating');
  const [debouncedSearchTerm] = useDebounce(searchTerm, 300);
  const [filteredData, setFilteredData] = useState(initialData);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    let filtered = initialData.filter(item => {
      const searchTerms = debouncedSearchTerm.toLowerCase().split(' ');
      const titleMatches = searchTerms.every(term => 
        item.playlist_title.toLowerCase().includes(term)
      );
      const categoryMatches = searchTerms.every(term => 
        item.playlist_category!.toLowerCase().includes(term)
      );
      const matchesSearch = titleMatches || categoryMatches;
      const matchesFilter = filterTerm === 'All' || item.playlist_category === filterTerm;
      return matchesSearch && matchesFilter;
    });

    // Sort the filtered data
    filtered.sort((a, b) => {
      switch (sortOption) {
        case 'rating':
          return ((b.avgPlaylistRate ?? 0) as number) - ((a.avgPlaylistRate ?? 0) as number);
        case 'newest':
          console.log(b.inserted_at, 'date of b')
          // console.log( new Date(a.inserted_at), 'date of a')
          return new Date(b.inserted_at).getTime() - new Date(a.inserted_at).getTime();
        case 'oldest':
          return new Date(a.inserted_at).getTime() - new Date(b.inserted_at).getTime();
        default:
          return 0;
      }
    });

    setFilteredData(filtered);
    setIsLoading(false);
  }, [debouncedSearchTerm, filterTerm, sortOption, initialData]);
   
  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };
   
  const handleFilter = (term: string) => {
    setFilterTerm(term);
  };

  const handleSort = (option: SortOption) => {
    setSortOption(option);
  };

  return (
    <>
      <div className="flex flex-col md:flex-row justify-between w-full max-w-3xl md:items-center items-end mb-2">
        <Search onSearch={handleSearch} />
       
        
          <select
         
            id="sort"
            value={sortOption || "Sort By"}
            onChange={(e) => handleSort(e.target.value as SortOption)}
            className="bg-gray-700 text-sm md:text-md text-white/70 rounded px-2 py-1 items-center mt-4 md:mt-0"
          >
            <option value="rating">Rating</option>
            <option value="newest">Newly Added</option>
            <option value="oldest">Oldest</option>
          </select>
       
       
      </div>
      <Filter onFilter={handleFilter} />
      
      {isLoading ? (
        <div className="flex justify-center items-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-purple-500"></div>
        </div>
      ) : filteredData.length > 0 ? (
        <div className='grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-8 mb-2 w-full max-w-7xl'>
          {filteredData.map(playlist => (
            <Suspense key={playlist.id} fallback={<Loading />}>
              <PlaylistCard {...playlist} />
            </Suspense>
          ))}
        </div>
      ) : (
        <div className='flex flex-col gap-7 justify-center items-center p-8'>
          <p className='w-full text-center text-md text-gray-100'>No Playlist Found</p>
          <Image src="/not-found.svg" alt='not-found' width={150} height={150}/>
        </div>
      )}
    </>
  );
};

export default ClientSideSearchWrapper;