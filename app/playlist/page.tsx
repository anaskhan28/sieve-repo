'use client'
import React, { useCallback, useEffect } from 'react'
import getUserData from '../actions/getUserData'
import { redirect } from 'next/navigation';
import addOrUpdatePlaylistData from '../actions/addPlaylistData';
import { getPlaylistCardData } from '@/utils/getPlaylistCardData';
import ClientSideSearchWrapper from '@/components/Wrapper';
import playlistJson from '@/playlist.json'
import { getQueryClient } from '@/utils/query';
import getPlaylistData from '../actions/getPlaylistData';
import { HydrationBoundary, dehydrate, useQuery } from '@tanstack/react-query';
import getRatings from '../actions/getRatings';
import { PlaylistType } from '@/types/Types';
export const dynamic = 'force-dynamic'

type Props = {
  [key: string]: string
}

interface PlaylistCardData {
  data: PlaylistType[]; // Adjust the type of data elements as necessary
}

const Playlist =  () => {

  // const userData = await getUserData();
  
  // if (!userData) {
  //   redirect('/signup');
  // }

  // const queryClient = getQueryClient()
  // await queryClient.prefetchQuery({
  //   queryKey: ["playlists"],
  //   queryFn: getPlaylistData,
  // },)

  // await queryClient.prefetchQuery({
  //   queryKey: ["ratings"],
  //   queryFn: getRatings
  // })
  

  // const playlistCardData = queryClient.getQueryData<PlaylistCardData>(['playlists']);  

  const { 
    data: playlistData, 
    error: playlistError, 
    isLoading
  } = useQuery({
    queryKey: ["playlists"],
    queryFn: getPlaylistData,
  });

console.log(playlistData, 'playlsitData')

const updatePlaylistData = useCallback(async () => {
  await addOrUpdatePlaylistData();
}, []);



console.log(playlistJson, 'data')
if (playlistData && playlistData?.data?.length !== playlistJson.length) {
  updatePlaylistData();
}

  return (
    <div className='bg-[#0E0E0E] w-full min-h-screen'>
      <div className='container p-2  flex flex-col justify-center items-center py-16'>
        <ClientSideSearchWrapper />
      </div>
    </div>
  )
}

export default Playlist