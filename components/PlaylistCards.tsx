
import React, { useEffect, useState } from 'react';
import PlaylistCard from '@/components/PlaylistCard';
import addPlaylistData from '@/app/actions/addPlaylistData';
import { PlaylistType } from '@/types/Types';
import getPlaylistData from '@/app/actions/getPlaylistData';

const PlaylistCards = async () => {

   
        const data = await getPlaylistData();
        
        if(!data) return null



    return (
        <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
            {data.map((playlist) => (
                <PlaylistCard
                   key={playlist.id}
                   id={playlist.id}
                   playlist_title={playlist.playlist_title}
                   playlist_image={playlist.playlist_image}
                   playlist_category={playlist.playlist_category}
                    
                />
            ))}
        </div>
    );
};

export default PlaylistCards;
