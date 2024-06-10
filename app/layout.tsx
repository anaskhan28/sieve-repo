import { Tenor_Sans } from 'next/font/google'
import { Libre_Franklin } from 'next/font/google'
import './globals.css'

const tenor_sans = Tenor_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-tenor_sans',
  weight: '400'
})
const libre_franklin = Libre_Franklin({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-libre_franklin',
  weight: '400'
})


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={tenor_sans.variable + ' ' + libre_franklin.variable}>
        
        {children}
        </body>
    </html>
  );
}
