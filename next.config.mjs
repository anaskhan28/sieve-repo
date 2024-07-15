/** @type {import('next').NextConfig} */
const nextConfig = {
  // logging:{
  // fetches:{
  //   fullUrl: true,
  // }
  // },
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'img.youtube.com',
          port: '',
          pathname: '/vi/**',
        },
        {
          protocol: 'https',
          hostname: 'i.ytimg.com',
          port: '',
          pathname: '/vi/**',
        },
      ],

    },
};

export default nextConfig;
