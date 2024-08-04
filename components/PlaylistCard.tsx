// components/PlaylistCard.tsx
import React, { Suspense } from 'react';
import Image from 'next/image';
import { Star, Eye } from 'lucide-react';
import Link from 'next/link';
import Rate from './Rate';
import { PlaylistType } from '@/types/Types';
import Loading from './loading';

type PlaylistCardProps = PlaylistType & {
  playlistRating: number | null;
  avgPlaylistRate: string | null;
};

const PlaylistCard = (props: PlaylistCardProps) => {
  return (
    <Suspense key={props.playlist_id} fallback={<Loading/>}>
    <div className=' w-full rounded-xl overflow-hidden'>
      <Link className='block relative aspect-video' href={`/playlist/${props.id}`}>
        <Image 
          src={props.playlist_image} 
          alt={props.playlist_title}
          fill
          className='object-cover w-[24rem] h-auto'
        />
        <div className='absolute top-3 left-3 bg-[#4C5557] bg-opacity-80 px-2 py-1 rounded text-white text-sm'>
          {props.playlist_category}
        </div>
      </Link>
      <div className='p-2 flex justify-around text-center items-center'>
        <div className='text-sm md:text-base w-1/2 max-w-sm text-pretty text-start  text-[#d3dcde] mb-2'>{props.playlist_title}</div>
        <div className='flex items-center justify-between '>
          <span className='flex justify-center items-center text-yellow-400'>
            <Star fill='currentColor' className='w-5 h-5 mr-1' />
            <span className='text-white'>{props.avgPlaylistRate || '0.0'}</span>
          </span>
          {/* <span className='flex items-center text-gray-400'>
            <Eye className='w-5 h-5 mr-1' />mb-2
            <span>{props.views || '0'}K</span>
          </span> */}
        </div>
        <div className='flex justify-end mb-1'>
          <Rate {...props} playlistRating={props.playlistRating} />
        </div>
      </div>
    </div>
    </Suspense>
  );
};

export default PlaylistCard;