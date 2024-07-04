
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { Star, Eye } from 'lucide-react'
import Link from 'next/link'
import Rate from './Rate'
import addRatings from '@/app/actions/addRatings'
import getUserData from '@/app/actions/getUserData'
import { PlaylistType } from '@/types/Types'


const PlaylistCard = async (props: PlaylistType) => {

  return (
    
   
        <div className='bg-inherit flex flex-col '>
           <Link href={`/playlist/${props.id}`}>
           <Image src={props.playlist_image} alt='image' width={500} height={500} className='w-full object-fit'/>
           </Link>
             <div className='flex flex-rows justify-evenly items-center'>
             <span className='text-lg self-start text-[#D9D9D9]'>{props.playlist_title}</span>
            
             <span className='flex text-[#D9D9D9] justify-center items-center gap-2'><Star fill='#FAC815' className='text-yellow-300' width={20} height={20} />8.2</span>
            <Rate {...props}/>
          <div className='flex flex-row justify-center items-center gap-1'>
          <span className="text-xs text-gray-400 ">2.1k </span>
          <Eye className='text-gray-400' width={20} height={20}/>
          </div>

             </div>
           
        </div>
   

   
  )
}

export default PlaylistCard