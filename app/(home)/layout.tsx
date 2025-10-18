'use client'
import '../../styles/team/team.css'
import '../../styles/users/main.css'
import '../../styles/users/onboard.css'
import { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import { NavStore } from '@/src/zustand/notification/Navigation'
import PublicHeader from '@/components/Public/PublicHeader'
import PublicNavbar from '@/components/Public/PublicNavbar'
import PublicFooter from '@/components/Public/PublicFooter'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const { setShowHeader, setHeaderHeight } = NavStore()
  const scrollContainerRef = useRef<HTMLDivElement | null>(null)
  const lastScrollY = useRef(0)
  const isOutOfView = useRef(false)
  // const [isMd, setIsMd] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const container = scrollContainerRef.current
    if (!container) return

    const handleScroll = () => {
      const currentScrollY = container.scrollTop

      if (currentScrollY > lastScrollY.current && lastScrollY.current > 100) {
        // Scrolling down
        setShowHeader(false)
        isOutOfView.current = true
      } else if (currentScrollY < lastScrollY.current && isOutOfView.current) {
        // Scrolling up
        setShowHeader(true)
        isOutOfView.current = false
      }

      lastScrollY.current = currentScrollY
    }

    container.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      container.removeEventListener('scroll', handleScroll)
    }
  }, [])

  useEffect(() => {
    if (pathname.includes('/home/friends')) {
      setHeaderHeight(0)
    }
    const media = window.matchMedia('(min-width: 767px)')
    // setIsMd(media.matches)

    const handler = (e: MediaQueryListEvent) => console.log(e.matches)
    media.addEventListener('change', handler)

    return () => media.removeEventListener('change', handler)
  }, [pathname])
  return (
    <>
      <PublicHeader />
      <PublicNavbar />
      {children}
      <PublicFooter />
    </>
  )
}
