export interface User {
    id: string;
    full_name: string;
    avatar_url: string;
    email: string;
}
export interface PlaylistType {
    id?: string,
    playlist_id?: number;
    user_name?: string;
    playlist_url?: string;
    playlist_summary?: string;
    playlist_title: string;
    playlist_category?: string;
    playlist_image: string;
    user_profile_link?: string;
    user_profile_image_link?: string
    playlistRating?: number,
    playlist_rates?: number,
    inserted_at?: string | undefined,
    views?: number,

}

export interface RatingType {
    id?: string,
    playlist_id: string,
    user_id: string,
    rating: any,

}