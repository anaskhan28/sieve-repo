
import PlaylistCard from '@/components/PlaylistCard';
import { cn } from '@/lib/utils';
import { PlaylistType } from '@/types/Types';

interface PlaylistCardProps {
    className?: string;
    playlistData: any
  }
const PlaylistCards =  ({className, playlistData}: PlaylistCardProps) => {

           
  

    return (
        <>
            <div className={ className }>
                {playlistData.map((playlist: PlaylistType) => (
                    <PlaylistCard
                        key={playlist.id}
                        id={playlist.id}
                        playlist_title={playlist.playlist_title}
                        playlist_image={playlist.playlist_image}
                        playlist_category={playlist.playlist_category}
                    />
                ))}
            </div>
        </>
    );
};

export default PlaylistCards;
