import Image from 'next/image';
import React from 'react'



const Card = (
   {
    image,
    title,
    paragraph,
   }: {
    image: string;
    title: string;
    paragraph:string

}
) => {
  return (
    <div className=' bg-[#F5F5F7] rounded-xl  p-12 flex flex-col justify-center items-center text-center gap-3'>
        <Image className=' max-h-40' src={image} width={260} height={170} alt={title}/>
        <h1 className='text-2xl font-bold'>{title}</h1>
        <p className='text-xl font-light text-gray-400 max-w-64 flex flex-wrap text-center'>{paragraph}</p>

    </div>
  )
}

export const Cards = () =>{
    return (
        <div className='flex flex-col justify-center items-center align-middle p-4'>

          <div className=' p-6 md:p-16 rounded-xl border-2 max-w-fit flex flex-col justify-around gap-12 items-center '>
          <div className='flex flex-col gap-3 items-center text-center'>
<h1 className='text-3xl font-black '>So, how does it work?</h1>
            <p className='text-xl text-gray-400'>The process is pretty simple and yet amazing.</p>
</div>
          <div className='flex flex-col sm:flex-row gap-5'>
          <Card
          
            image='/custom.png'
            title='Custom Playlist'
            paragraph='Best playlist by the students for other students'
            />
            <Card
            image='/rate.png'
            title='Rate Playlist'
            paragraph='Students rate the playlists and make other students life easy'
            />
            <Card
            image='/watch.png'
            title='Watch & Learn'
            paragraph='Now you got the best playlist to level up your skill'
            />
          </div>
          </div>
        </div>
    )
}