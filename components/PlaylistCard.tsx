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
    <Suspense key={props.playlist_id} fallback={<Loading />}>
      <div className='grid gap-5 content-start'>
        <Link href={`/playlist/${props.id}`} className='relative overflow-hidden'>
          <Image src={props.playlist_image} alt={props.playlist_title + '- Sieve'} width={500} height={500} className='w-full rounded-xl object-cover h-full hover:scale-110 transition-all ease-linear ' />
          <div className='text-white capitalize font-bold text-lg absolute top-0 left-0 p-2 text-center right-0 bg-[#756EF4] rounded-t-xl '>{props.playlist_category}</div>
          <div className='text-[#373737] capitalize font-bold text-lg absolute bottom-0 left-0 p-2 text-center right-0 bg-white rounded-b-xl line-clamp-1'>{props.playlist_title}</div>
        </Link>
        <div className='flex justify-around items-center'>
          <span className='text-base md:text-lg  max-w-md text-wrap break-all w-full self-start text-[#D9D9D9] '>{props.playlist_title}</span>
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