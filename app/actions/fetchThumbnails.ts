import { google } from 'googleapis';

const youtube = google.youtube({
    version: 'v3',
    auth: process.env.YOUTUBE_API_KEY // Store your API key in environment variables
  });
  
  export const getThumbnailUrl = async (url: string): Promise<string> => {
    const videoIdMatch = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})/);
    const playlistIdMatch = url.match(/list=([^&]+)/);
  
    try {
      let thumbnailUrl = '/default-thumbnail.png';
  
      if (videoIdMatch) {
        const videoId = videoIdMatch[1];
        const response =  `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
        if (response) {
          thumbnailUrl = response;
        } else {
          console.log('No items found for video ID:', videoId);
        }
      }else if (playlistIdMatch) {
        const playlistId = playlistIdMatch[1];
        const response =  await youtube.playlists.list({
          part: ['snippet'],
          id: [playlistId]
        });
        
        if ((response?.data?.items?.length ?? 0) > 0) {
          thumbnailUrl = response.data.items?.[0]?.snippet?.thumbnails?.high?.url ?? thumbnailUrl;
        }
      }
  
      return thumbnailUrl;
    } catch (error) {
      console.error('Error fetching thumbnail:', error);
      return '/default-thumbnail.png';
    }
  };