"use client";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import ClientSideSearchWrapper from "@/components/Wrapper";
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
    queryFn: async () => initialData.data || [], // ✅ Ensure array
    initialData: initialData.data || [],
  });

  console.log(playlistError, "playlistData");

  return (
    <div className="bg-[#0E0E0E] w-full min-h-screen">
      <div className="container p-2 flex flex-col justify-center items-center py-16">
        <ClientSideSearchWrapper />
      </div>
    </div>
  );
};

export default Playlist;
