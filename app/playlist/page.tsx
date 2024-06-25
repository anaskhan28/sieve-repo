import React from 'react'
import getUserData from '../actions/getUserData'
import { redirect } from 'next/navigation';
import { Search } from '@/components/search';
import Image from 'next/image';
import Filter from '@/components/Filter'
type Props = {}



const playlist = async (props: Props) => {
//   const userData = await getUserData();
//   console.log(userData)
// if(!userData){

//   return redirect('/signup')
// }
  return (
    <div className='bg-[#0E0E0E] w-full h-screen'>
      <div className='container p-4 flex flex-col justify-center items-center py-16'>
      <Search/>

    <div className='hidden md:flex text-white justify-end  items-center gap-2 mt-5 self-start '>
      <Image src="/category.svg" alt='category' width={30} height={30}/>
      <span className='text-lg md:text-xl items-center'>Categories</span>
    </div>

     <Filter/>
      </div>
    </div>
  )
}

export default playlist