import React from 'react'
import getUserData from '../actions/getUserData'
import { redirect } from 'next/navigation';
import addOrUpdatePlaylistData from '../actions/addPlaylistData';
import { getPlaylistCardData } from '@/utils/getPlaylistCardData';
import ClientSideSearchWrapper from '@/components/Wrapper';
import playlistJson from '@/playlist.json'
import { getQueryClient } from '@/utils/query';
import getPlaylistData from '../actions/getPlaylistData';
import { HydrationBoundary, dehydrate } from '@tanstack/react-query';
import getRatings from '../actions/getRatings';
import { PlaylistType } from '@/types/Types';
type Props = {
  [key: string]: string
}



const Playlist = async ({ searchParams }: { searchParams: Props }) => {

  const userData = await getUserData();
  
  if (!userData) {
    redirect('/signup');
  }

  const queryClient = getQueryClient()
  await queryClient.prefetchQuery({
    queryKey: ["playlists"],
    queryFn: getPlaylistData,
  },)

  await queryClient.prefetchQuery({
    queryKey: ["ratings"],
    queryFn: getRatings
  })
  

  const playlistCardData = await queryClient.getQueryData(['playlists']);
 
  if (playlistCardData && Array.isArray(playlistCardData) && playlistCardData.length !== playlistJson.length) {
    await addOrUpdatePlaylistData();
  }

 
  return (
    <div className='bg-[#0E0E0E] w-full min-h-screen'>
      <div className='container p-2  flex flex-col justify-center items-center py-16'>
        <HydrationBoundary state={dehydrate(queryClient)}>
        <ClientSideSearchWrapper />
        </HydrationBoundary>
      </div>
    </div>
  )
}

export default Playlist