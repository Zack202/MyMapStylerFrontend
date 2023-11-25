import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from './providers';

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'My Map Styler',
  description: 'Create and share amazing maps!',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}><Providers>{children}</Providers></body>
    </html>
  )
}