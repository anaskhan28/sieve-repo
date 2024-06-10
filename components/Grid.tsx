import { cn } from "@/utils/cn";
import React from "react";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import {
  IconClipboardCopy,
  IconFileBroken,
  IconSignature,
  IconTableColumn,
} from "@tabler/icons-react";
import Image from "next/image";

export function BentoGrids() {
  return (
    <>
     <div className="text-3xl md:text-5xl sm:max-w-[45rem] mt-20 mb-12 text-center font-bold ">We offer a way for a students 
to get precise resources</div>
   <div className="flex h-screen w-full items-center justify-center p-6 ">
   
    <div className=" w-full h-full justify-center max-w-4xl grid grid-cols-1  md:grid-cols-10 md:grid-rows-6 mt-6 gap-6">
      <div className="bg-[#2A2A3C] text-white flex flex-col relative justify-center rounded-3xl items-center  md:col-span-4 md:row-span-4 ">
        <Image src="/rocket.png" className="  md:block max-w-sm md:max-w-xl mb-16" width={400}height={400} alt="rocket" priority={true}/>
        <div className=" absolute bottom-5 text-white left-5 font-bold pl-2 w-60 text-wrap text-2xl md:text-4xl">
        Using Sieve will save time and money
        </div>
      </div>
      <div className="relative bg-[#2A2A3C] text-white flex justify-center rounded-3xl items-center md:col-span-6 md:row-span-2 ">
        <span className="text-[#929799] absolute top-5 left-7 font-semibold">Awesome</span>
       <Image src="/table.png" className="  md:block max-w-xl md:ml-[20rem]" width={317}height={317} alt="rocket" priority={true}/>
       <div className="absolute bottom-3  md:left-7 text-2xl md:text-left text-center md:text-[2.1rem] font-bold md:w-[17.5rem] md:bottom-10">Great resources to learn anything</div>
      </div>
      <div className="bg-[#2A2A3C] hidden  text-white relative md:flex justify-center rounded-3xl items-center  md:col-span-3 md:row-span-2 ">
        <div className="text-xl md:text-3xl font-bold md:mb-14 text-center">Trendy Playlist</div>
        <Image src="/phone.png" className=" md:absolute md:bottom-[-7rem]  md:block max-w-xl" width={273}height={273} alt="rocket" priority={true}/>

      </div>
      <div className="bg-[#2A2A3C] text-white flex justify-center rounded-3xl items-center  md:col-span-3 md:row-span-2 ">
       <div className="flex flex-col justify-between mx-auto items-center gap-8 ">
       <div className="text-center text-3xl flex-1 text-wrap md:text-3xl font-bold">
        <div className="bg-gradient-to-r from-[#FF659C] to-[#3FA1FF] 
        font-bold text-transparent bg-clip-text pb-2">Sieve </div>
        offers a way to become top 1%</div>
       <div className="text-[#929799]  font-semibold">Goal</div>
       </div>
      </div>
   

    </div>



   </div>
   </>
  );
}
const Skeleton = () => (
  <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl   dark:bg-dot-white/[0.2] bg-dot-black/[0.2] [mask-image:radial-gradient(ellipse_at_center,white,transparent)]  border border-transparent dark:border-white/[0.2]"></div>
);
const Imageton = () => (
  <div className="absolute right-12 max-w-fit">
      <Image src='/rocket.png' width={337} height={337} alt="phone"/>


    </div>
);


const items = [
  {
    title: "The Dawn of Innovation",
    description: "Explore the birth of groundbreaking ideas and inventions.",
    header: <Imageton/>,
    className: "md:col-span-2 relative",
    icon: <IconClipboardCopy className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "The Digital Revolution",
    description: "Dive into the transformative power of technology.",
    header: <Skeleton />,
    className: "md:col-span-1",
    icon: <IconFileBroken className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "The Art of Design",
    description: "Discover the beauty of thoughtful and functional design.",
    header: <Skeleton />,
    className: "md:col-span-1",
    icon: <IconSignature className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "The Power of Communication",
    description:
      "Understand the impact of effective communication in our lives.",
    header: <Skeleton />,
    className: "md:col-span-2",
    icon: <IconTableColumn className="h-4 w-4 text-neutral-500" />,
  },
];
