

import { NavbarMobile } from '@/components/NavbarMobile'
import { Provider } from '@/utils/provider';

export default function RootLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
      <html lang="en">
        <body >
        <NavbarMobile/>
        <Provider>
          {children}
          </Provider>
          </body>
      </html>
    );
  }