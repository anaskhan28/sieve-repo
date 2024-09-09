"use client";

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { FormEvent } from "react"
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
  onSearch: (searchTerm: string) => void;
  onSort: (sort: any) => void;
}

type SortOption = 'rating' | 'newest' | 'oldest';


export default function Search({ onSearch, onSort }: SearchProps) {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const query = formData.get('query') as string;
    onSearch(query);
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearch(e.target.value);
  }

  return (
    <div className="flex w-full max-w-2xl -mt-10 mb-2 md:mb-0 md:mt-0 items-center space-x-2">
    <form onSubmit={handleSubmit} className="flex w-full max-w-sm md:max-w-xl items-center">
      <Input 
        className="bg-transparent text-white text-sm md:text-base"
        name="query"
        type="text"
        placeholder="search any topic..."
        onChange={handleInputChange}
      />
      {/* <Button className="bg-[#756EF4] hover:bg-[#847fe1]" type="submit">Search</Button> */}
     
    </form>
    <Select
          onValueChange={(option: SortOption) => onSort(option)}

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