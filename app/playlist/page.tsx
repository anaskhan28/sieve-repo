import React from 'react'
import getUserData from '../actions/getUserData'
import { redirect } from 'next/navigation';
import Filter from '@/components/Filter'
import addOrUpdatePlaylistData from '../actions/addPlaylistData';
import { getPlaylistCardData } from '@/utils/getPlaylistCardData';
import ClientSideSearchWrapper from '@/components/Wrapper';
import playlistJson from '@/playlist.json'

type Props = {
  [key: string]: string
}

const Playlist = async ({ searchParams }: { searchParams: Props }) => {
  const userData = await getUserData();
  
  if (!userData) {
    redirect('/signup');
  }


  const playlistCardData = await getPlaylistCardData();
  if (!playlistCardData) return null;

  if(playlistCardData.playlistData.length !== playlistJson.length){
    await addOrUpdatePlaylistData()
  }
  const { ratings, playlistData } = playlistCardData;

  const enrichedPlaylistData = playlistData.map(playlist => ({
    ...playlist,
    playlistRating: ratings.find(r => r.playlist_id === playlist.id)?.rating || null,
    avgPlaylistRate: playlist.playlist_rates?.toFixed(1) || null
  }));

  return (
    <div className='bg-[#0E0E0E] w-full min-h-screen'>
      <div className='container p-2  flex flex-col justify-center items-center py-16'>
        <ClientSideSearchWrapper initialData={enrichedPlaylistData} />
      </div>
    </div>
  )
}

export default Playlist