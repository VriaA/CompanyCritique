import "./globals.css";
import { Inter, Lato } from 'next/font/google'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const lato = Lato({ weight: ['400', '700'], subsets: ['latin'], variable: '--font-lato' })

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${lato.variable}`}>
      <body>{children}</body>
    </html>
  );
}