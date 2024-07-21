// components/PlaylistCards.tsx
import React from 'react';
import PlaylistCard from './PlaylistCard';
import { PlaylistType } from "@/types/Types";

type EnrichedPlaylistType = PlaylistType & {
  playlistRating: number | null;
  avgPlaylistRate: string | null;
};

type Props = {
  className: string;
  playlistData: EnrichedPlaylistType[];
};

const PlaylistCards = ({ className, playlistData }: Props) => {
  return (
    <div className={className}>
      {playlistData.map((playlist) => (
        <PlaylistCard key={playlist.id} {...playlist} />
      ))}
    </div>
  );
};

export default PlaylistCards;