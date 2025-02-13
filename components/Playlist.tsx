"use client";
import React, { useCallback, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import addOrUpdatePlaylistData from "@/app/actions/addPlaylistData";
import ClientSideSearchWrapper from "@/components/Wrapper";
import playlistJson from "@/playlist.json";
import { PlaylistType } from "@/types/Types";

export const dynamic = "force-dynamic";

interface Props {
  initialData: {
    data: PlaylistType[] | null;
    totalCount: number;
  };
}

const Playlist = ({ initialData }: Props) => {
  const {
    data: playlistData,
    error: playlistError,
    isLoading,
  } = useQuery({
    queryKey: ["playlists"],
    queryFn: async () => initialData.data || [], // ✅ Ensure an array is always returned
    initialData: initialData.data || [], // ✅ Default to empty array if null
  });

  console.log(playlistData, "playlistData");

  const updatePlaylistData = useCallback(async () => {
    await addOrUpdatePlaylistData();
  }, []);

  useEffect(() => {
    if (playlistData && playlistData.length !== playlistJson.length) {
      updatePlaylistData();
    }
  }, [playlistData, updatePlaylistData]);

  return (
    <div className="bg-[#0E0E0E] w-full min-h-screen">
      <div className="container p-2 flex flex-col justify-center items-center py-16">
        <ClientSideSearchWrapper />
      </div>
    </div>
  );
};

export default Playlist;
