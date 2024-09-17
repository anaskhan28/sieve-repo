"use client";

import { lazy, Suspense, useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import InfiniteScroll from 'react-infinite-scroller';
import Search from './Search';
import Filter from './Filter';
import Loading from './loading';
import getPlaylistData from '@/app/actions/getPlaylistData';
import getRatings from '@/app/actions/getRatings';
import { PlaylistType } from "@/types/Types";
import addOrUpdatePlaylistData from '@/app/actions/addPlaylistData';
import playlistJson from '@/playlist.json'
const PlaylistCard = lazy(() => import('./PlaylistCard'));

type EnrichedPlaylistType = PlaylistType & {
  playlistRating: number | null;
  avgPlaylistRate: string | null;
  inserted_at: string | undefined;
};

type SortOption = 'rating' | 'newest' | 'oldest';

const ClientSideSearchWrapper = () => {
  const params = useSearchParams();
  const tag = params.get("tag");
  const search = params.get("search");
  const sort = params.get("sort") as SortOption | null;

  const [displayCount, setDisplayCount] = useState(6);

  const { data: ratingData, error: ratingError } = useQuery({
    queryKey: ["ratings"],
    queryFn: getRatings,
  });

  const { 
    data: playlistData, 
    error: playlistError, 
    isLoading
  } = useQuery({
    queryKey: ["playlists"],
    queryFn: getPlaylistData,
  });

  const enrichedPlaylistData = useMemo(() => {
    if (!playlistData?.data || !ratingData) return [];

    return playlistData.data.map(playlist => ({
      ...playlist,
      playlistRating: ratingData.find(r => r.playlist_id === playlist.id)?.rating ?? null,
      avgPlaylistRate: playlist.playlist_rates?.toFixed(1) ?? null,
      inserted_at: playlist?.inserted_at,
    }));
  }, [playlistData, ratingData]);

 

  const filteredData = useMemo(() => {
    let result = enrichedPlaylistData;

    if (tag) {
      result = result.filter((playlist) => playlist?.playlist_category === tag);
    }

    if (search) {
      const searchTerms = search.toLowerCase().split(' ');
      result = result.filter((playlist) => 
        searchTerms.every(term => 
          playlist.playlist_title.toLowerCase().includes(term) ||
          playlist.playlist_category?.toLowerCase().includes(term)
        )
      );
    }

    if (sort) {
      switch (sort) {
        case 'rating':
          result.sort((a, b) => Number(b.avgPlaylistRate || 0) - Number(a.avgPlaylistRate || 0));
          break;
        case 'newest':
          result.sort((a, b) => 
            new Date(b.inserted_at || 0).getTime() - new Date(a.inserted_at || 0).getTime()
          );
          break;
        case 'oldest':
          result.sort((a, b) => 
            new Date(a.inserted_at || 0).getTime() - new Date(b.inserted_at || 0).getTime()
          );
          break;
      }
    }

    return result;
  }, [enrichedPlaylistData, tag, search, sort]);

  const loadMore = () => {
    setDisplayCount((prevCount) => prevCount + 6);
  };

  return (
    <>
      <Search />
      <Filter />
      
      {isLoading ? (
        <div className="flex justify-center items-center mt-8">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-purple-500"></div>
        </div>
      ) : filteredData.length === 0 ? (
        <div className='flex flex-col gap-7 justify-center items-center p-8'>
          <p className='w-full text-center text-md text-gray-100'>No Playlist Found</p>
          <Image src="/not-found.svg" alt='not-found' width={150} height={150}/>
        </div>
      ) : (
        <InfiniteScroll
          pageStart={0}
          loadMore={loadMore}
          hasMore={displayCount < filteredData.length}
          loader={<Loading key={0} />}
          className='w-full max-w-7xl'
          
        >
          <div className='grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-8 mb-2 w-full max-w-7xl'>
            {filteredData.slice(0, displayCount).map((playlist, index) => (
              <Suspense key={`${playlist.id}-${index}`} fallback={<Loading />}>
                <PlaylistCard {...playlist} />
              </Suspense>
            ))}
          </div>
        </InfiniteScroll>
      )}
    </>
  );
};

export default ClientSideSearchWrapper;