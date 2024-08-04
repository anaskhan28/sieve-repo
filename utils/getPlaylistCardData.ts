// utils/getPlaylistCardData.ts
import getRatings from '@/app/actions/getRatings';
import getPlaylistData from '@/app/actions/getPlaylistData';
import playlist from '@/playlist.json'
export async function getPlaylistCardData() {
  const ratings = await getRatings();
  const playlist = await getPlaylistData();
  

  if (!ratings || !playlist) return null;

  return { ratings, playlist };
}