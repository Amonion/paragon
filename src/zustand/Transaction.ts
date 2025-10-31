import { create } from 'zustand'
import apiRequest from '@/lib/axios'
import { Product } from './Product'

export interface Cart {
  productImage: string
  productPrice: 0
  productName: string
  productId: string
}

export interface Transaction {
  _id: string
  totalAmount: number
  payment: string
  total: number
  products: Product[]
  picture: string
  fullName: string
  status: boolean
  isProfit: boolean
  createdAt: Date | null
  isActive?: boolean
  isChecked?: boolean
}

export const TransactionEmpty = {
  _id: '',
  totalAmount: 0,
  payment: '',
  picture: '',
  total: 0,
  products: [],
  createdAt: null,
  fullName: '',
  status: false,
  isProfit: false,
}

interface FetchResponse {
  count: number
  message: string
  page_size: number
  results: Transaction[]
  result: FetchResponse
  summary: { totalLoss: number; totalProfit: number }
}

interface TransactionState {
  loading: boolean
  page_size: number
  summary: { totalLoss: number; totalProfit: number }
  count: number
  period: string
  transactions: Transaction[]
  transactionForm: Transaction
  fromDate: Date | null
  toDate: Date | null
  createTransaction: (
    url: string,
    updatedItem: FormData | Record<string, unknown>,
    setMessage: (message: string, isError: boolean) => void,
    redirect?: () => void
  ) => Promise<void>
  updateTransaction: (
    url: string,
    updatedItem: FormData | Record<string, unknown>,
    setMessage: (message: string, isError: boolean) => void
  ) => Promise<void>
  getTransactions: (
    url: string,
    setMessage: (message: string, isError: boolean) => void
  ) => Promise<void>
  setProcessedResults: (data: FetchResponse) => void
  setFromDate: (date: Date) => void
  setToDate: (date: Date) => void
  setPeriod: () => void
  setLoading?: (loading: boolean) => void
}

const TransactionStore = create<TransactionState>((set) => ({
  loading: false,
  count: 0,
  page_size: 0,
  period: 'all',
  transactions: [],
  fromDate: null,
  toDate: null,
  transactionForm: TransactionEmpty,
  summary: { totalLoss: 0, totalProfit: 0 },

  setPeriod: () => {
    set({
      period: 'all',
      fromDate: null,
      toDate: null,
    })
  },

  setFromDate: (date: Date) => {
    set({ fromDate: date, period: '' })
  },

  setToDate: (date: Date) => {
    set({ toDate: date, period: '' })
  },

  setLoading: (loadState: boolean) => {
    set({ loading: loadState })
  },

  setProcessedResults: ({ count, results }: FetchResponse) => {
    if (results) {
      const updatedResults = results.map((item: Transaction) => ({
        ...item,
        isChecked: false,
        isActive: false,
      }))

      set({
        count,
        transactions: updatedResults,
      })
    }
  },

  getTransactions: async (url: string, setMessage) => {
    try {
      const response = await apiRequest<FetchResponse>(url, {
        setMessage,
        setLoading: TransactionStore.getState().setLoading,
      })
      const data = response?.data
      if (data) {
        set({ summary: data.summary })
        TransactionStore.getState().setProcessedResults(data)
      }
    } catch (error: unknown) {
      console.log(error)
    }
  },

  updateTransaction: async (url, body, setMessage) => {
    try {
      const response = await apiRequest<FetchResponse>(url, {
        method: 'PATCH',
        body,
        setMessage,
      })
      const data = response?.data
      if (data) {
        TransactionStore.getState().setProcessedResults(data.result)
      }
    } catch (error: unknown) {
      console.log(error)
    }
  },
  createTransaction: async (url, body, setMessage, redirect) => {
    try {
      const response = await apiRequest<FetchResponse>(url, {
        method: 'POST',
        body,
        setMessage,
      })
      const data = response?.data
      if (data) {
        console.log(data)
      }
      if (redirect) redirect()
    } catch (error: unknown) {
      console.log(error)
    }
  },
}))

export default TransactionStore
