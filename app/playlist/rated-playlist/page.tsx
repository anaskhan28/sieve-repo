'use client'

import React, { useMemo } from 'react'
import getUserData from '../../actions/getUserData'
import { redirect } from 'next/navigation';
import { getPlaylistCardData } from '@/utils/getPlaylistCardData';
import PlaylistCards from '@/components/PlaylistCards';
import getRatings from '../../actions/getRatings';
import { PlaylistType } from '@/types/Types'; // Make sure to import your PlaylistType
import Image from 'next/image';
import { useQuery } from '@tanstack/react-query';
import getPlaylistData from '@/app/actions/getPlaylistData';
type Props = {
  [key:string]: string
}

type EnrichedPlaylistType = PlaylistType & {
  playlistRating: number | null;
  avgPlaylistRate: string | null;
};

const RatedPlaylist =  () => {
  // const userData = await getUserData();
  
  // if (!userData) {
  //   return redirect('/signup');
  // }

  // // const playlistData = await getPlaylistCardData();
  // if (!playlistData) return null;

  // const getUserRatingDetails = playlistData.ratings;
  // if (!getUserRatingDetails) return null;



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


  console.log(playlistData, 'playlsitData')


  const ratedPlaylistDetails = useMemo(() => { 
    if(!playlistData || !playlistData.data || !ratingData || !ratingData) return [];

    return playlistData.data
    .filter((playlist) => ratingData.some((rating) => rating.playlist_id === playlist.id))
    .map((playlist) => {
      const userRating = ratingData.find((rating) => rating.playlist_id === playlist.id);
      return {
        ...playlist,
        playlistRating: userRating ? userRating.rating : null,
        avgPlaylistRate: playlist.playlist_rates?.toFixed(1) || null
      };
    });
  }, [playlistData, ratingData])
  // const enrichedPlaylistData = useMemo(() => {
  //   if (!playlistData?.data || !ratingData) return [];

  //   return playlistData.data.map(playlist => ({
  //     ...playlist,
  //     playlistRating: ratingData.find(r => r.playlist_id === playlist.id)?.rating ?? null,
  //     avgPlaylistRate: playlist.playlist_rates?.toFixed(1) ?? null,
  //     inserted_at: playlist?.inserted_at,
  //   }));
  // }, [playlistData, ratingData]);

  // console.log(enrichedPlaylistData, 'enrichedPlaylistData')

  return (
    <div className='bg-[#0E0E0E] w-full min-h-screen '>
      {
        ratedPlaylistDetails.length>0 ? 
        <div className='container mx-auto px-4 py-4 mb-10 md:mb-0'>
        <PlaylistCards className='grid grid-cols-1 md:grid-cols-3 gap-8 ' playlistData={ratedPlaylistDetails} />
       </div>
       :
       (
        <div className='flex justify-center items-center h-screen w-full'>
          <Image className='' src="/not-found.svg" alt='not-found' width={150} height={150}/>
        </div>
      )
      }
    
    </div>
  )
}

export default RatedPlaylist