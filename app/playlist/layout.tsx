

import { NavbarMobile } from '@/components/NavbarMobile'
import Navbar from '@/components/Navbar'
import '@smastrom/react-rating/style.css';
import { Suspense } from 'react';
import Loading from './loading';

export default function RootLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
      <html lang="en">
        <body >
        <NavbarMobile/>
        <Suspense fallback={<Loading/>}>
          {children}
          </Suspense>
          </body>
      </html>
    );
  }