

import { NavbarMobile } from '@/components/NavbarMobile'
import Navbar from '@/components/Navbar'
import '@smastrom/react-rating/style.css';

export default function RootLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
      <html lang="en">
        <body >
        <NavbarMobile/>
          {children}
          </body>
      </html>
    );
  }