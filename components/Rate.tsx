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
import { useState } from "react"
import { Star } from 'lucide-react'
import { Rating } from "@smastrom/react-rating"


export default function Rate({playlistName}: {
    playlistName: string
}) {
    const [rating, setRating] = useState<number>();

    function onChange(newValue: number) {
      console.log(newValue);
      setRating(newValue);
    }
  
  return (
    <Dialog>
      <DialogTrigger asChild>
   
      <Star  className='text-yellow-300 cursor-pointer hover:bg-gray-600 hover:' width={20} height={20} />
        
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-[#1f1f1f] ">
        <DialogHeader className="relative flex flex-col justify-center items-center gap-4">
  
           <svg 
           xmlns="http://www.w3.org/2000/svg" 
           width="80" height="80" viewBox="0 0 24 24" 
           fill='#d2861b' className="  absolute -top-16 left-36 right-36 lucide lucide-star">
  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
  <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="currentColor" className=" text-[7px] text-white font-bold">
    {rating? rating: "?"}</text>
</svg>

         <div className="flex flex-col justify-center items-center gap-2">
         <DialogTitle className="mt-4 text-[#d2861b] text-md uppercase md:text-lg">Rate this</DialogTitle>
         <DialogTitle className="text-white text-lg md:text-xl">{playlistName}</DialogTitle>
         </div>
          <DialogDescription>
          <Rating
          style={{ maxWidth: 360 }}
          value={rating || 0}
          items={10}
        
          onChange={onChange}
          transition="zoom"
        />
          </DialogDescription>
        </DialogHeader>
       
        <DialogFooter>
          <Button className="self-center text-md md:text-lg w-full mt-2 bg-[#313131] hover:bg-[#3e3a3a]" type="submit">Rate This</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}