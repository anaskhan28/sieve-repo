// utils/getPlaylistCardData.ts
import getRatings from '@/app/actions/getRatings';
import getPlaylistData from '@/app/actions/getPlaylistData';

export async function getPlaylistCardData() {
  const ratings = await getRatings();
  const playlistData = await getPlaylistData();
  

  if (!ratings || !playlistData) return null;

  return { ratings, playlistData };
}