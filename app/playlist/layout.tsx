export const dynamic = 'force-dynamic'; // Force dynamic rendering


import { NavbarMobile } from '@/components/NavbarMobile'
import { Provider } from '@/utils/provider';
import { getQueryClient } from '@/utils/query';
import getPlaylistData from '../actions/getPlaylistData';
import getRatings from '../actions/getRatings';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';




export default async function RootLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {

    const queryClient = getQueryClient()
    await queryClient.prefetchQuery({
      queryKey: ["playlists"],
      queryFn: getPlaylistData,
    },)
    
    await queryClient.prefetchQuery({
      queryKey: ["ratings"],
      queryFn: getRatings
    })
    
    return (
      <html lang="en">
        <body >
        <NavbarMobile/>
        <Provider>
        <HydrationBoundary state={dehydrate(queryClient)}>

          {children}
          </HydrationBoundary>
          </Provider>
          </body>
      </html>
    );
  }