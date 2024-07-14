

import { NavbarMobile } from '@/components/NavbarMobile'


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