import './globals.css'
import localFont from 'next/font/local'

const togalite = localFont({
  src: '../../public/fonts/Togalite-Heavy.otf',
  display: 'swap',
})

export const metadata = {
  title: '帰省の盾',
  description: '過干渉防衛システム',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body className={togalite.className}>{children}</body>
    </html>
  )
}
