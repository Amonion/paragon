import { create } from 'zustand'
import apiRequest from '@/lib/axios'

export interface Cart {
  productImage: string
  productPrice: 0
  productName: string
  productId: string
}

export interface Transaction {
  amount: number
  bonus: number
  total: number
  products: Cart[]
  time: Date | string
  customer: string
  status: boolean
  isActive?: boolean
  isChecked?: boolean
}

export const TransactionEmpty = {
  amount: 0,
  bonus: 0,
  total: 0,
  products: [],
  time: '',
  customer: '',
  status: false,
}

interface FetchResponse {
  count: number
  message: string
  page_size: number
  result: Transaction
}

interface TransactionState {
  loading: boolean
  period: string
  transactionForm: Transaction
  fromDate: Date | null
  toDate: Date | null
  getUtility: (url: string) => Promise<void>
  setFromDate: (date: Date) => void
  setToDate: (date: Date) => void
  setPeriod: (period: string) => void
  setLoading?: (loading: boolean) => void
}

const TransactionStore = create<TransactionState>((set) => ({
  loading: false,
  period: 'all',
  fromDate: null,
  toDate: null,
  transactionForm: TransactionEmpty,

  setPeriod: (periodData: string) => {
    set((prev) => {
      return {
        period: periodData === prev.period ? 'all' : periodData,
      }
    })
  },

  setFromDate: (date: Date) => {
    set({ fromDate: date })
  },

  setToDate: (date: Date) => {
    set({ toDate: date })
  },

  setLoading: (loadState: boolean) => {
    set({ loading: loadState })
  },

  getUtility: async (url: string) => {
    try {
      const response = await apiRequest<FetchResponse>(url, {
        setLoading: TransactionStore.getState().setLoading,
      })
      const data = response?.data
      if (data) {
        console.log(data.result)
      }
    } catch (error: unknown) {
      console.log(error)
    }
  },
}))

export default TransactionStore
