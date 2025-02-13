
import getPlaylistData from "../actions/getPlaylistData";
import Playlist from "@/components/Playlist";

export default async function Page() {
  const playlistData = await getPlaylistData(); // ✅ Fetch data server-side
  return <Playlist initialData={playlistData} />;
}
