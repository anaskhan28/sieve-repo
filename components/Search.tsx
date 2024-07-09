
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ReactNode, useState } from "react"
import { updateFilters } from "@/app/actions/updatedFilter";


export default function Search() {

  
  return (
    <form action={updateFilters} className="flex w-full max-w-xl items-center space-x-2">
      <Input 
      
      className="bg-transparent text-white"
      name="query"
       type="text"
       placeholder="search any topic..." />
      <Button  className="bg-[#756EF4] hover:bg-[#847fe1]" type="submit">Search</Button>
    </form>
  )
}
