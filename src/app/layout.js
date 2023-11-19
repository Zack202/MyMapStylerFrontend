import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'My Map Styler',
  description: 'Create and share amazing maps!',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head></head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}

/*
        */ {/* Add Google Fonts link for Michroma font */} /*
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Michroma&display=swap"></link>
        */ {/* Use Inter font */} /*
        <style>{inter.css}</style>
*/