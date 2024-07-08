
import PlaylistCard from '@/components/PlaylistCard';
import { PlaylistType } from '@/types/Types';


const PlaylistCards =  ({playlistData}: any) => {

           
  

    return (
        <>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
            {playlistData.map((playlist:PlaylistType) => (
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
