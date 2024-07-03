
import React, { useEffect, useState } from 'react';
import PlaylistCard from '@/components/PlaylistCard';
import addPlaylistData from '@/app/actions/addPlaylistData';
import { PlaylistType } from '@/types/Types';
import getPlaylistData from '@/app/actions/getPlaylistData';

const PlaylistCards = async () => {

   
        const data = await getPlaylistData();
        
        if(!data) return null


   console.log(data, 'data of cards')

    return (
        <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
            {data.map((playlist) => (
                <PlaylistCard
                    key={playlist.id}
                    playlistId={playlist.id}
                    playlistImage={playlist.playlist_image}
                    playlistTitle={playlist.playlist_title}
                    plyalistName={playlist.playlist_title}
                />
            ))}
        </div>
    );
};

export default PlaylistCards;
