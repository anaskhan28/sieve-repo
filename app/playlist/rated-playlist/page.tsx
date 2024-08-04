import React from 'react'
import getUserData from '../../actions/getUserData'
import { redirect } from 'next/navigation';
import getPlaylistData from '@/app/actions/getPlaylistData';
import PlaylistCards from '@/components/PlaylistCards';
import getRatings from '../../actions/getRatings';
import { PlaylistType } from '@/types/Types'; // Make sure to import your PlaylistType
import Image from 'next/image';
type Props = {
  [key:string]: string
}

type EnrichedPlaylistType = PlaylistType & {
  playlistRating: number | null;
  avgPlaylistRate: string | null;
};

const RatedPlaylist = async () => {
  const userData = await getUserData();
  
  if (!userData) {
    return redirect('/signup');
  }

  const playlistData = await getPlaylistData();
  if (!playlistData) return null;

  const getUserRatingDetails = await getRatings();
  if (!getUserRatingDetails) return null;

  const ratedPlaylistDetails: EnrichedPlaylistType[] = playlistData
    .filter((playlist) => getUserRatingDetails.some((rating) => rating.playlist_id === playlist.id))
    .map((playlist) => {
      const userRating = getUserRatingDetails.find((rating) => rating.playlist_id === playlist.id);
      return {
        ...playlist,
        playlistRating: userRating ? userRating.rating : null,
        avgPlaylistRate: playlist.playlist_rates?.toFixed(1) || null
      };
    });


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