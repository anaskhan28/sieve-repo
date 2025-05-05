// app/playlists/page.tsx (Server Component)
import getPlaylistData from "../actions/getPlaylistData";
import addOrUpdatePlaylistData from "../actions/addPlaylistData";
import Playlist from "@/components/Playlist";
import playlistJson from "@/playlist.json";

export default async function Page() {
  const playlistData = await getPlaylistData(); // ✅ Fetch from DB

  // ✅ Server-side comparison with JSON data
  console.log(playlistJson.length, 'playlistData')
  console.log(playlistData.totalCount! - playlistJson.length, 'remaning playlist')
  if (playlistData.totalCount !== playlistJson.length) {
    console.log("Updating playlist data on the server...");
    await addOrUpdatePlaylistData(); // ✅ Update DB if mismatch
  }

  return <Playlist initialData={playlistData} />;
}
