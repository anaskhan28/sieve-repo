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
      <div className='grid gap-1 content-start hover:scale-105 transition-all ease-linear relative'>
        <Link href={`/playlist/${props.id}`} className='relative '>
          <div className='overflow-hidden  lg:h-[155px] xl:h-[176px]'>
            <Image src={props.playlist_image} alt={props.playlist_title + '- Sieve'} width={500} height={500} className='	 w-full rounded-xl object-cover h-full  ' />
          </div>
          {/* <div className='text-[#373737] capitalize font-bold text-base absolute bottom-0 left-0 p-1 text-center right-0 bg-white rounded-b-xl line-clamp-1'>{props.playlist_title}</div> */}
        </Link>

        <div className='grid grid-cols-3 gap-y-2 justify-items-start'>
          <span className='text-base col-span-3 md:text-ls max-w-md text-wrap break-all w-full self-start text-white font-medium '>{props.playlist_title}</span>
          <span className='flex text-[#D9D9D9] items-center gap-2'>
            <Star fill='#FAC815' className='`w-4 h-4 text-yellow-300' />
            <p className='text-sm md:text-base'>{props.avgPlaylistRate || '0.0'}</p>
          </span>
          <Rate {...props} playlistRating={props.playlistRating} />
          <div className='text-white capitalize font-bold text-xs rounded  px-3 top-0 left-0 p-[5px] text-center bg-[#756EF4]'>{props.playlist_category}</div>
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