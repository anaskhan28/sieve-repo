import React from 'react'
import playlists from '@/playlist.json'
import PlaylistCard from '@/components/PlaylistCard'
import Image from 'next/image'
import { Star, Eye } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import Link from 'next/link'
import getPlaylistData from '@/app/actions/getPlaylistData'
import Rate from '@/components/Rate'

type Props = {}

const PlaylistDetail = async ({params}: {
    params: {playlistId: string}
}) => {
  const dataPlaylist = await getPlaylistData();

  

  if(!dataPlaylist) return null
    const playlist = dataPlaylist.find((pl) => pl.id === params.playlistId);

    if (!playlist) {
      return <p className='flex justify-around items-center text-xl'>Playlist not found.</p>;
    }
  return (
    <div className='bg-[#0E0E0E] w-full min-h-screen'>

    
    <div className=" container mx-auto px-8 py-8 flex flex-row justify-between">
      <div className='w-full max-w-3xl felx flex-col'>
    
      <Image src={playlist.playlist_image} alt={playlist.playlist_title} width={300} height={300} className="w-full object-fit mb-4" />
      <div className='flex flex-row gap-8 items-center justify-self-auto pl-6 -mt-2 max-w-2xl'>
             <span className='text-md md:text-xl self-start text-[#D9D9D9]'>{playlist.playlist_title} Full Course Playlist</span>
            
             <span className='flex text-[#D9D9D9] justify-center items-center text-md md:text-lg gap-2'><Star fill='#FAC815' className='text-yellow-300' width={25} height={25} />8.2</span>
             <Rate {...playlist}/>
          <div className='flex flex-row justify-center items-center gap-2'>
          <span className="text-md md:text-lg text-gray-400 ">2.1k</span>
          <Eye className='text-gray-400' width={25} height={25}/>
          </div>

             </div>
             <div className="userInfo flex flex-row gap-4 justify-start mt-8 pl-6">
             <Avatar>
      <AvatarImage src={playlist.user_profile_Image_link} alt="profile" />
      <AvatarFallback>User Profile</AvatarFallback>
    </Avatar>
   
<div className='flex flex-col gap-4'>
  <div>
  <h1 className='text-xs md:text-sm font-medium text-gray-400'>Created by</h1>
  <h1 className='text-sm md:text-lg text-white'>{playlist.user_name}</h1>
  </div>
<p className='text-white text-sm bg-[#3F3F3F] p-4 w-full h-full ml-0 md:-ml-12 rounded-lg '>
 {playlist.playlist_summary}
</p>
</div>

             </div>
     
      </div>
      <div className='flex flex-col gap-4 px-6'>
        <h1 className='text-md md:text-xl w-2/3 self-center text-white text-center p-2 rounded-full border border-purple-400'>Most Rated Playlists</h1>
      {

    playlists.map((playlist, key) => (
        <div key={key} className='bg-inherit flex flex-col '>
           <Link href={`/playlist/${playlist.id}`}>
           <Image src={playlist.image} alt='image' width={400} height={400} className=' object-fit'/>
             <div className='flex flex-rows justify-evenly items-center'>
             <span className='text-lg self-start text-[#D9D9D9]'>{playlist.title}</span>
            
             <span className='flex text-[#D9D9D9] justify-center items-center gap-2'><Star fill='#FAC815' className='text-yellow-300' width={20} height={20} />8.2</span>
             <Star   className='text-yellow-300' width={20} height={20} />
             
          <div className='flex flex-row justify-center items-center gap-1'>
          <span className="text-xs text-gray-400 ">{playlist.views}</span>
          <Eye className='text-gray-400' width={20} height={20}/>
          </div>

             </div>
           </Link>
        </div>
    ))
   }
   </div>
    </div>
    </div>
  )
}

export default PlaylistDetail