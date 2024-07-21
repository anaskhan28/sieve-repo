import { cn } from "@/utils/cn";
import React from "react";
import {
  IconClipboardCopy,
  IconFileBroken,
  IconSignature,
  IconTableColumn,
} from "@tabler/icons-react";
import Image from "next/image";

export function BentoGrids() {
  return (
    <div className="bg-white max-h-full">
     <div className="text-2xl md:text-4xl sm:max-w-[45rem] mt-10 md:mt-20 md:mb-12 mb-4 text-center font-bold ">
     Overwhelmed by the sheer volume of tech content on YouTube?
          </div>

   <div className="flex h-screen w-full items-center justify-center p-2 md:p-6 ">
   
    <div className=" w-full h-full  justify-center max-w-4xl grid grid-cols-1  md:grid-cols-10 md:grid-rows-6 mt-6 gap-6">
      <div className="bg-[#2A2A3C] text-white flex max-h-80 md:max-h-full md:flex-col relative justify-center rounded-3xl items-center  md:col-span-4 md:row-span-4 ">
        <Image src="/rocket.png" className="  md:block max-w-sm md:max-w-xl mb-16" width={400}height={400} alt="rocket" priority={true}/>
        <div className=" absolute bottom-5 text-white left-5 font-bold pl-2 w-60 text-wrap text-2xl md:text-4xl">
       Save Time, and Learn Better
      

        </div>
      </div>
      <div className="relative bg-[#2A2A3C] text-white flex flex-col md:flex-row max-h-80 md:max-h-full justify-center rounded-3xl items-center md:col-span-6 md:row-span-2 ">
        <span className="text-[#929799] absolute top-5 left-7 font-semibold">Awesome</span>
       <Image src="/table.png" className="-mt-5 mb-10 md:-mt-0 md:mb-0 md:block max-w-xl md:ml-[20rem]" width={317}height={317} alt="rocket" priority={true}/>
       <div className="absolute bottom-5 md:left-7 text-2xl md:text-left text-center md:text-[2.1rem] font-bold md:w-[17.5rem] md:bottom-10">Trusted resources to learn anything</div>
      </div>
      <div className="bg-[#2A2A3C] max-h-80 md:max-h-full p-6  text-white relative flex flex-col md:flex-row justify-center rounded-3xl items-center  md:col-span-3 md:row-span-2 ">
        <div className="text-3xl  mt-44 md:mt-0 font-bold md:mb-20 text-center md:p-2">Discover the Best Playlists</div>
        <Image src="/phone.png" className=" md:absolute  md:bottom-[-7rem] md:block w-full max-w-4xl" width={273}height={273} alt="rocket" priority={true}/>

      </div>
      <div className="bg-[#2A2A3C] text-white  flex h-80 md:max-h-full justify-center rounded-3xl items-center  md:col-span-3 md:row-span-2 ">
       <div className="flex flex-col  justify-between mx-auto items-center gap-8 ">
       <div className="text-center text-3xl flex-1 text-wrap md:text-3xl font-bold">
        <div className="bg-gradient-to-r from-[#FF659C] to-[#3FA1FF] 
        font-bold text-transparent bg-clip-text pb-2"> With Sieve </div>
        Curate Your Learning Path</div>
       <div className="text-[#929799]  font-semibold">Goal</div>
       </div>
      </div>
   

    </div>



   </div>
   </div>
  );
}


