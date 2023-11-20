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
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Michroma&display=swap"
        />
        <style>{inter.css}</style>
      </head>
      <body className={inter.className}><Providers>{children}</Providers></body>
    </html>
  )
}