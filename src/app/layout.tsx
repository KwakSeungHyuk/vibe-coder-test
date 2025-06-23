import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import React from 'react'
import '../styles/globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Vibe Coder Kwak - Build Your Product with Vibe',
  description: '빠르고 감각적인 제품 개발을 위한 바이브 코딩. 스타트업부터 MVP까지, 당신의 아이디어를 현실로 만들어보세요.',
  keywords: ['vibe coding', '제품 개발', 'MVP', '스타트업', '프로그래밍', '웹개발'],
  authors: [{ name: 'Vibe Coder Kwak' }],
  openGraph: {
    title: 'Vibe Coder Kwak - Build Your Product with Vibe',
    description: '빠르고 감각적인 제품 개발을 위한 바이브 코딩',
    type: 'website',
    locale: 'ko_KR',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Vibe Coder Kwak - Build Your Product with Vibe',
    description: '빠르고 감각적인 제품 개발을 위한 바이브 코딩',
  },
  viewport: 'width=device-width, initial-scale=1',
  robots: 'index, follow',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
} 