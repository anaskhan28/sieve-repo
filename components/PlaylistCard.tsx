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
    <div className='bg-inherit flex flex-col relative'>
      <Link href={`/playlist/${props.id}`}>
        <Image src={props.playlist_image} alt='image' width={500} height={500} className='w-full rounded-3xl object-fit h-full'/>
        <div className='text-sm absolute text-white top-3 bg-[#4C5557] bg-opacity-60 px-2 py-y right-44  rounded-xl'>{props.playlist_category}</div>
      </Link>
      <div className='flex flex-rows justify-around items-center'>
        <span className='text-sm md:text-lg w-60 max-w-md text-wrap self-start text-[#D9D9D9]'>{props.playlist_title}</span>
        <span className='flex text-[#D9D9D9] justify-center items-center gap-2'>
          <Star fill='#FAC815' className='`w-7 h-7 text-yellow-300' />
          <p className='text-sm md:text-lg'>{props.avgPlaylistRate || '0.0'}</p>
        </span>
        <Rate {...props} playlistRating={props.playlistRating} />
        {/* <div className='flex flex-row justify-center items-center gap-1'>
          <span className="text-xs text-gray-400 ">2.1k </span>
          <Eye className='text-gray-400' width={20} height={20}/>
        </div> */}
      </div>
    </div>
    </Suspense>
  );
};

export default PlaylistCard;