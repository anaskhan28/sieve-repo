"use client";

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { FormEvent } from "react"

type SearchProps = {
  onSearch: (searchTerm: string) => void;
}

export default function Search({ onSearch }: SearchProps) {
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
    <form onSubmit={handleSubmit} className="flex w-full sm:w-[600px] items-center relative">
      <Input
        className="bg-transparent text-white border border-gray-500 rounded-full placeholder:text-gray-500 focus:outline-none focus-visible:outline-none focus-visible:ring placeholder:text-base p-5 "
        name="query"
        type="text"
        placeholder="search any topic..."
        onChange={handleInputChange}
      />
      <Button className="bg-gray-500 h-full absolute right-0 rounded-full w-[100px] rounded-l-none hover:bg-[#847fe1]" type="submit">Search</Button>
    </form>
  )
}