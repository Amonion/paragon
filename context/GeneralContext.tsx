'use client'
import { initializeSound } from '@/lib/sound'
import useSocket from '@/src/useSocket'
import { MessageStore } from '@/src/zustand/notification/Message'
import { createContext, useEffect, useContext, ReactNode, useMemo } from 'react'

const GeneralContext = createContext<{
  socket: ReturnType<typeof useSocket> | null
}>({
  socket: null,
})

interface GeneralProviderProps {
  children: ReactNode
}

export const GeneralProvider = ({ children }: GeneralProviderProps) => {
  const socket = useSocket()
  const { setBaseUrl } = MessageStore()

  useEffect(() => {
    initializeSound()
    const url =
      process.env.NODE_ENV === 'production'
        ? process.env.NEXT_PUBLIC_PROD_API_URL
        : process.env.NEXT_PUBLIC_DEV_API_URL
    setBaseUrl(String(url))
  }, [])

  const value = useMemo(() => ({ socket }), [socket])

  return (
    <GeneralContext.Provider value={value}>{children}</GeneralContext.Provider>
  )
}

export const useGeneralContext = () => useContext(GeneralContext)
