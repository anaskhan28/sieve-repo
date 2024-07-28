import Image from 'next/image'
import {ArrowUpRight} from 'lucide-react'
import Link from 'next/link'

const navigation = {
  connect: [
    { name: 'Home', href: '/' },
    {
      name: 'Playlist',
      href: '/playlist',
    },
    {
      name: 'SignIn',
      href: '/sign',
    },
    {
      name: 'Join Now',
      href: '/sign',
    },
  ],
  company: [
    { name: 'Guidelines', href: '/' },
    { name: 'GitHub Repo', href: 'https://github.com/anaskhan28/sieve-repo' },

  ],
}

const Footer = () => {
  return (
    <footer
      aria-labelledby="footer-heading"
      className="font-inter w-full
      bg-[#20172b]  text-white transition-bg"
    >
    
      <div className="mx-auto max-w-7xl px-2">
        <div className="flex flex-col justify-between lg:flex-row">
          <div className="space-y-8 mt-10">
            <Image
              priority={true}
              unoptimized={true}
              width={100}
              height={40}
              src="/name.png"
              alt="logo"
              className="h-10 w-auto"
            />
            <p className="text-md max-w-xs leading-6 text-white dark:text-gray-300">
            At Sieve, we believe in the collective wisdom of the tech community.
            </p>
            <div className="flex space-x-6 text-sm text-white dark:text-gray-300">
              <div>Made with ❤️ by Abdus Salam.</div>
            </div>
          </div>
          {/* Navigations */}
          <div className="mt-16 grid grid-cols-2 gap-14 md:grid-cols-2 lg:mt-0 xl:col-span-2">
            <div className="mt-10">
              <h3 className="text-sm font-semibold leading-6 text-white dark:text-gray-200">
                Connect
              </h3>
              <div className="mt-6 space-y-4">
                {navigation.connect.map((item) => (
                  <div key={item.name}>
                    <Link
                      href={item.href}
                      rel="noreferrer"
                      className="text-sm leading-6 text-gray-500 hover:text-gray-200 dark:text-gray-600 hover:dark:text-gray-200"
                    >
                      {item.name}
                    </Link>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div className='mt-10'>
                <h3 className="text-sm font-semibold leading-6 text-white dark:text-gray-200">
                  Contribute
                </h3>
                <div className="mt-6 space-y-4">
                  {navigation.company.map((item) => (
                    <div key={item.name}>
                      <Link
                      target='_blank'
                        href={item.href}
                        className="text-sm leading-6 flex gap-1 justify-center text-gray-500 hover:text-gray-200 dark:text-gray-600 hover:dark:text-gray-200"
                      >
                        {item.name} <ArrowUpRight/>
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-16 border-t border-gray-300/10 pt-8 sm:mt-20 lg:mt-24 dark:border-gray-100/10">
          <p className="text-xs leading-5 text-white dark:text-gray-300">
            &copy; 2024 Sieve. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer