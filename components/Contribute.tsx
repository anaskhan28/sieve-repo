"use client";

import { motion } from "framer-motion";
import React from "react";
import { AuroraBackground } from "./ui/aura-background";
import Link from "next/link";
import {ArrowUpRight} from 'lucide-react'


export function Contrbute() {
  return (
    <AuroraBackground>
      <motion.div
        initial={{ opacity: 0.0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="relative flex flex-col gap-1 sm:gap-4 items-center text-center justify-center px-4"
      >
        <div className="text-2xl md:text-6xl font-bold dark:text-white text-center">
          Want to contribute your playlist?
        </div>
        <div className="font-extralight text-base md:text-3xl dark:text-neutral-200 py-4">
          Click here to follow the steps and make your first contribution!
        </div>
        
        <button className="group/button relative overflow-hidden border-purple-300 bg-white
          transition-all duration-150 hover:border-purple-500 active:scale-95
          rounded-lg 
          mt-8 flex justify-center items-center">
             <span className="absolute bottom-0 left-0 z-0 h-0 w-full 
             bg-gradient-to-t from-purple-600 to-purple-500 transition-all
              duration-500 group-hover/button:h-full" />
            <Link
              className="inline-flex text-center items-center h-12  px-4
              relative z-10 transition-all duration-500 group-hover/button:text-white
               text-[#5C5DC2] text-lg md:text-xl font-medium"
              href="#"
            >
              Contribute Now <ArrowUpRight className='ml-1 text-[#5C5DC2] group-hover/button:text-white
          ' width={30} height={30}/>
            </Link>
          </button>
      </motion.div>
    </AuroraBackground>
  );
}
