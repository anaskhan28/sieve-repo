import Image from 'next/image';
import React from 'react';
import Link from 'next/link';  

const Card = (
  {
    image,
    title,
    paragraph,
  }: {
    image: string;
    title: string;
    paragraph: string;
  }
) => {
  return (
    <Link
      href="/playlist"
      className="bg-[#F5F5F7] max-h-80 md:max-h-full rounded-xl p-6 md:p-12 flex flex-col justify-center items-center text-center gap-3
      transform transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-lg cursor-pointer"
    >

        <Image
          className="h-40 max-h-full"
          src={image}
          width={260}
          height={170}
          alt={title}
        />
        <h1 className="text-xl md:text-2xl font-bold">{title}</h1>
        <p className="text-lg md:text-xl font-light text-gray-400 max-w-64 flex flex-wrap text-center">
          {paragraph}
        </p>
    </Link>
  );
};

export const Cards = () => {
  return (
    <div className="flex flex-col justify-center items-center align-middle p-2 md:p-4">
      <div className="p-3 md:p-16 rounded-xl border-2 max-w-fit flex flex-col justify-around gap-6 md:gap-12 items-center ">
        <div className="flex flex-col gap-3 items-center text-center">
          <h1 className="text-3xl font-black">So, how does it work?</h1>
          <p className="text-lg md:text-xl text-gray-400">
            The process is pretty simple and yet amazing.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-5">
          <Card
            image="/custom.png"
            title="Custom Playlist"
            paragraph="Personalize your learning experience with best playlist"
          />
          <Card
            image="/rate.png"
            title="Rate and Review"
            paragraph="Contribute to the community by rating and reviewing playlists."
          />
          <Card
            image="/watch.png"
            title="Watch & Learn"
            paragraph="With Sieve top-rated playlists, you can efficiently level up your skills"
          />
        </div>
      </div>
    </div>
  );
};
