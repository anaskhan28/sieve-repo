import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="flex flex-col space-y-3 ">
      <Skeleton className="h-[250px] w-[400px] bg-gray-300  rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px] bg-gray-300 " />
        <Skeleton className="h-4 w-[200px] bg-gray-300 " />
      </div>
    </div>
  )
}
