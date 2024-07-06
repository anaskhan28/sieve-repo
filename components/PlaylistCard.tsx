
import React from 'react'
import Image from 'next/image'
import { Star, Eye } from 'lucide-react'
import Link from 'next/link'
import Rate from './Rate'
import addRatings from '@/app/actions/addRatings'
import getUserData from '@/app/actions/getUserData'
import { PlaylistType } from '@/types/Types'
import getRatings from '@/app/actions/getRatings'


const PlaylistCard =  async (props: PlaylistType) => {


    const res = await getRatings();
    if(!res) return null;

      // Find the rating for the current playlist
      const playlistRating = res.find((r) => r.playlist_id === props.id)?.rating || null;
     
    
      
      
      
    
  
  
  return (
    
   
        <div className='bg-inherit flex flex-col relative'>
           <Link href={`/playlist/${props.id}`}>
           <Image src={props.playlist_image} alt='image' width={500} height={500} className='w-full rounded-3xl object-fit h-full'/>
           <div className='text-sm absolute text-white top-3 bg-[#4C5557] bg-opacity-60 px-2 py-y right-44  rounded-xl'>{props.playlist_category}</div>
           </Link>
             <div className='flex flex-rows justify-evenly items-center'>
             <span className='text-lg self-start text-[#D9D9D9]'>{props.playlist_title}</span>
            
             <span className='flex text-[#D9D9D9] justify-center items-center gap-2'><Star fill='#FAC815' className='text-yellow-300' width={20} height={20} />8.2</span>
            <Rate {...props} playlistRating={playlistRating!} />
          <div className='flex flex-row justify-center items-center gap-1'>
          <span className="text-xs text-gray-400 ">2.1k </span>
          <Eye className='text-gray-400' width={20} height={20}/>
          </div>

             </div>
           
        </div>
   

   
  )
}

export default PlaylistCard