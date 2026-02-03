import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Deepak Prabaharan | Data Engineer',
  description:
    'Data Engineer specializing in modern data stack technologies including dbt, Airflow, Snowflake, and AWS.',
  keywords: ['Data Engineer', 'dbt', 'Airflow', 'Snowflake', 'AWS', 'Python', 'SQL'],
  authors: [{ name: 'Deepak Prabaharan' }],
  openGraph: {
    title: 'Deepak Prabaharan | Data Engineer',
    description: 'Data Engineer specializing in modern data stack technologies',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
