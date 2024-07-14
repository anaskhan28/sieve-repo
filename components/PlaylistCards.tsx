
import Loading from '@/components/loading';
import PlaylistCard from '@/components/PlaylistCard';
import { PlaylistType } from '@/types/Types';
import { Suspense } from 'react';

interface PlaylistCardProps {
    className?: string;
    playlistData: any
  }
const PlaylistCards =  ({className, playlistData}: PlaylistCardProps) => {

           
  

    return (
        <>
            <div className={ className }>
            {playlistData.map((playlist: PlaylistType) => (
                <Suspense key={playlist.id} fallback={<Loading/>}>
                <PlaylistCard
                    key={playlist.id}
                    id={playlist.id}
                    playlist_title={playlist.playlist_title}
                    playlist_image={playlist.playlist_image}
                    playlist_category={playlist.playlist_category}
                />
                </Suspense>
            ))}
            </div>
        </>
        );
};

export default PlaylistCards;
