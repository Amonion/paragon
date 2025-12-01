'use client'
import '../../styles/team/team.css'
import '../../styles/users/main.css'
import '../../styles/utility.css'
import Response from '../../components/Messages/Response'
// import { playPopSound } from '@/lib/sound'
import UserAlert from '@/components/Messages/UserAlert'
import { MessageStore } from '@/src/zustand/notification/Message'
import { NavStore } from '@/src/zustand/notification/Navigation'
import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import VerticalNavigation from '@/components/Admin/VerticalNavigation'
import MainHeader from '@/components/Admin/MainHeader'
import useSocket from '@/src/useSocket'
import TransactionStore, { Transaction } from '@/src/zustand/Transaction'
import NotificationStore, {
  Notification,
} from '@/src/zustand/notification/Notification'
import ProductStore from '@/src/zustand/Product'

interface NotificationResponse {
  notification: Notification
  transaction: Transaction
  unread: number
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  // const { transactions, isNotification } = TransactionStore()
  const { buyingProducts, getBuyingProducts } = ProductStore()
  const { message, setMessage } = MessageStore()
  const { headerHeight } = NavStore()
  const [isMd, setIsMd] = useState(false)
  const pathname = usePathname()
  const socket = useSocket()

  useEffect(() => {
    if (buyingProducts.length === 0) {
      const params = `?page_size=20&page=1&ordering=name&isBuyable=true`
      getBuyingProducts(`/products/${params}`, setMessage)
    }
  }, [pathname])

  useEffect(() => {
    const media = window.matchMedia('(min-width: 990px)')
    setIsMd(media.matches)

    const handler = (e: MediaQueryListEvent) => setIsMd(e.matches)
    media.addEventListener('change', handler)

    return () => media.removeEventListener('change', handler)
  }, [pathname])

  // useEffect(() => {
  //   let interval: NodeJS.Timeout | null = null

  //   if (pathname !== '/admin/transactions' && transactions.length > 0) {
  //     const shouldRing = !isNotification
  //     if (shouldRing && pathname === 'not noso') {
  //       interval = setInterval(() => {
  //         playPopSound()
  //       }, 5000)
  //     }
  //   } else {
  //     if (pathname === '/admin/transactions') {
  //       TransactionStore.setState({ isNotification: false })
  //     }
  //   }

  //   return () => {
  //     if (interval) clearInterval(interval)
  //   }
  // }, [pathname, transactions, isNotification])

  useEffect(() => {
    if (!socket) return
    socket.on(`admin`, (data: NotificationResponse) => {
      TransactionStore.setState((prev) => {
        return {
          transactions: [data.transaction, ...prev.transactions],
        }
      })
      NotificationStore.setState((prev) => {
        return {
          notifications: [data.notification, ...prev.notifications],
          unread: data.unread,
        }
      })
    })
    return () => {
      socket.off(`admin`)
    }
  }, [socket])
  return (
    <>
      {message !== null && <Response />}

      {/* {display && <UploadFile />} */}
      <UserAlert />

      <div className="body-content w-full flex justify-center">
        <div className="w-full">
          <div className="flex w-full">
            <VerticalNavigation />
            <div className="flex-1 md:pb-0 md:pl-5 overflow-x-auto md:overflow-visible">
              <MainHeader />
              {/* <div className="pt-5 flex-1"> */}
              <div
                style={{
                  marginTop: isMd ? 0 : `${headerHeight}px`,
                  minHeight: `calc(100vh - ${headerHeight}px)`,
                }}
                className={`md:pt-5 sm:mr-3  flex flex-col flex-1`}
              >
                {children}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
