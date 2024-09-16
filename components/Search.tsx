"use client";

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { FormEvent } from "react"
import { Search as SearchIcon } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
type SearchProps = {
  
  
}

type SortOption = 'rating' | 'newest' | 'oldest';


export default function Search({  }: SearchProps) {
  const router = useRouter()

  const searchParams = useSearchParams();

  const setSearch = (search: string) => {
    const params = new URLSearchParams(searchParams);
    if (search) {
      params.set('search', search);
    } else {
      params.delete('search');
    }
    router.push(`/playlist?${params.toString()}`);
  };

  const setSort = (sort: SortOption) => {
    const params = new URLSearchParams(searchParams);
    if (sort) {
      params.set('sort', sort);
    } else {
      params.delete('sort');
    }
    router.push(`/playlist?${params.toString()}`);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const query = formData.get('query') as string;
    setSearch(query);
  };



  return (
    <div className="flex w-full max-w-2xl -mt-10 mb-2 md:mb-0 md:mt-0 items-center space-x-2">
    <form onSubmit={handleSubmit} className="flex w-full max-w-sm md:max-w-xl items-center relative border-2 border-white/50 rounded-md">
      <Input 
        className="bg-transparent text-white text-sm md:text-base border-none"
        name="query"
        type="text"
        placeholder="search any topic..."
        defaultValue={searchParams.get('search') || ''}
        
      />
      <Button className="bg-[#7a76c4] hover:bg-[#6966a5] -ml-2 absolute top-0 right-0 rounded-tl-none rounded-bl-none rounded-tr-[0.270rem] rounded-br-[0.270rem]" type="submit">{<SearchIcon/>}</Button>
      
     
    </form>
    <Select
           onValueChange={(option: SortOption) => setSort(option)}
           defaultValue={searchParams.get('sort') as SortOption || ''}

           >
       <SelectTrigger className="md:w-[180px] w-[100px] text-xs md:text-base bg-white/80 outline-none border-none data-[placeholder]:text-white data-[placeholder]:bg-[#847fe1] ">
         <SelectValue placeholder="Sort By:" />
       </SelectTrigger>
       <SelectContent className="text-white bg-[#847fe1] " position="popper" sideOffset={5}>
         <SelectGroup>
          
         <SelectItem value="rating">Most Rated</SelectItem>
           <SelectItem  value="newest">Newly Added</SelectItem>
           <SelectItem  value="oldest">Oldest</SelectItem>
         </SelectGroup>
       </SelectContent>
     </Select>
    </div>
  )
}