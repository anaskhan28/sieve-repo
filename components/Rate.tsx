'use client'
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useState, useCallback, useEffect } from "react"
import { Star } from 'lucide-react'
import { PlaylistType, RatingType } from "@/types/Types"

import addRatings from "@/app/actions/addRatings"
import getUserData from "@/app/actions/getUserData"
import getRatings from "@/app/actions/getRatings"
import { revalidatePath } from "next/cache"
import { DialogClose } from "@radix-ui/react-dialog"
import getPlaylistData from "@/app/actions/getPlaylistData"
import Rating from '@/components/Rating';
import { useOptimistic } from "react"
export default function Rate(playlist: PlaylistType) {
  const [rating, setRating] = useState<number>();
  const [optimisticPlaylist, addOptimisticPlaylist] = useOptimistic(
    playlist,
    (state, newRating: number) => ({ ...state, playlistRating: newRating })
  );
    function onChange(newValue: number) {
      console.log(newValue);
      setRating(newValue);
    }

    const onSubmit = useCallback(async () => {
      const userData: any = await getUserData();
      
      if (!userData) return null;
    
      // Optimistically update the UI
      addOptimisticPlaylist(rating || 0);
    
      try {
        const ratingData = await addRatings({
          user_id: userData.id,
          playlist_id: playlist.id || "",
          rating: rating || null
        });
    
        console.log(ratingData, 'ratingData');
        // You can handle the successful response here if needed
      } catch (error) {
        console.error('Error submitting rating:', error);
        // You might want to revert the optimistic update or show an error message
      }
    }, [rating, playlist.id, addOptimisticPlaylist]);






  
  return (
    <Dialog >
      <DialogTrigger asChild>
      <span className="text-white flex gap-1  justify-center text-center items-center text-sm md:text-base ">
      <Star fill={optimisticPlaylist.playlistRating ? "#5899ed" : ""}  className='text-[#5899ed] cursor-pointer hover:bg-gray-600 w-5 h-5' width={20} height={20} />
      {optimisticPlaylist.playlistRating ? optimisticPlaylist.playlistRating+ ".0" : " "}</span>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] rounded-lg  bg-[#1f1f1f] ">
        <DialogHeader className="relative flex flex-col justify-center items-center gap-4">
  
           <svg

           xmlns="http://www.w3.org/2000/svg" 
           width={`${rating? '100' : '80'}`} height={`${rating? '100' : '80'}`} viewBox="0 0 24 24" 
           fill='#5899ed' className={`${rating ? '-top-20': '-top-16 '}  absolute lucide lucide-star`}>
  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
  <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="currentColor" className=" text-[7px] text-white font-normal text-center py-4">
    {rating? rating: playlist.playlistRating ? playlist.playlistRating: "?"}</text>
</svg>

         <div className="flex flex-col justify-center items-center gap-2">
         <DialogTitle className="mt-4 text-[#d2861b] text-md uppercase md:text-lg">Rate this</DialogTitle>
         <DialogTitle className="text-white text-center text-wrap text-lg md:text-xl">{playlist.playlist_title}</DialogTitle>
         </div>
          <DialogDescription>
            {/* (
          <Rating
          
          style={{ maxWidth: 360, outline:"none", width:20 }}
          value={rating || playlist.playlistRating!}
          items={10}
          className="flex flex-row"
        
          onChange={onChange}
          transition="zoom"
        />
            ) */
            }

<Rating 
        initialRating={rating || playlist.playlistRating} 
        onChange={onChange}
      />
        
       
       

          </DialogDescription>
        </DialogHeader>
       
        <DialogFooter>
          <DialogClose className="self-center text-md md:text-lg w-full">
          <Button  onClick={ onSubmit} className={`self-center ${rating? 'text-[#313131] bg-[#f5c518] hover:bg-[#bc9d2d]': 'bg-[#313131]  '} text-md md:text-lg w-full mt-2 `} type="submit">Rate This</Button>

          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
