
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { Star, Eye } from 'lucide-react'
import Link from 'next/link'
import Rate from './Rate'
type PlaylistProps = {
  playlistId: number,
  playlistImage: string,
  plyalistName: string,
  playlistTitle: string,
  
}

const PlaylistCard = (props: PlaylistProps) => {

  return (
    
   
        <div className='bg-inherit flex flex-col '>
           <Link href={`/playlist/${props.playlistId}`}>
           <Image src={props.playlistImage} alt='image' width={500} height={500} className='w-full object-fit'/>
           </Link>
             <div className='flex flex-rows justify-evenly items-center'>
             <span className='text-lg self-start text-[#D9D9D9]'>{props.playlistTitle}</span>
            
             <span className='flex text-[#D9D9D9] justify-center items-center gap-2'><Star fill='#FAC815' className='text-yellow-300' width={20} height={20} />8.2</span>
            <Rate playlistName={props.plyalistName}/>
          <div className='flex flex-row justify-center items-center gap-1'>
          <span className="text-xs text-gray-400 ">2.1k </span>
          <Eye className='text-gray-400' width={20} height={20}/>
          </div>

             </div>
           
        </div>
   

   
  )
}

export default PlaylistCard