import React from 'react'
import getUserData from '../../actions/getUserData'
import { redirect } from 'next/navigation';
import Image from 'next/image';
import Filter from '@/components/Filter'
import getPlaylistData from '@/app/actions/getPlaylistData';
import PlaylistCards from '@/components/PlaylistCards';
import Search  from '@/components/Search';
import { NavbarMobile } from '@/components/NavbarMobile';
import getRatings from '../../actions/getRatings';



type Props = {
  [key:string]: string
}


const ratedPlaylist = async () => {


  const userData = await getUserData();
  
const playlistData = await getPlaylistData();
if (!playlistData) return null;

const getUserRatingDetails = await getRatings();
if (!getUserRatingDetails) return null;

const ratedPlaylistDetails = playlistData.filter((playlist) =>
  getUserRatingDetails.some((rating) => rating.playlist_id === playlist.id)
);

console.log(ratedPlaylistDetails, 'rated playlist details');

if(!getUserRatingDetails) return null
console.log(getUserRatingDetails, 'rating playlist')

  if (!userData) {
    return redirect('/signup');
  }

  

  return (
    <div className='bg-[#0E0E0E] w-full min-h-screen '>
     <div className='container mx-auto px-4 py-4 '>
      <PlaylistCards className='grid grid-cols-1 md:grid-cols-3 gap-8' playlistData={ratedPlaylistDetails}  />
     </div>
      
    </div>
  )
}

export default ratedPlaylist