
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export function Search() {
  return (
    <div className="flex w-full max-w-xl items-center space-x-2">
      <Input className="bg-transparent text-white" type="email" placeholder="search any topic..." />
      <Button className="bg-[#756EF4] " type="submit">Search</Button>
    </div>
  )
}
