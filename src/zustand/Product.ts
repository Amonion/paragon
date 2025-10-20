import { create } from 'zustand'
import _debounce from 'lodash/debounce'
import apiRequest from '@/lib/axios'

interface FetchResponse {
  message: string
  count: number
  page_size: number
  results: Product[]
  data: Product
}

export interface Product {
  _id: string
  name: string
  discount: number
  costPrice: number
  price: number
  description: string
  picture: string | File
  createdAt: Date | null | number
  seoTitle: string
  isChecked?: boolean
  isActive?: boolean
}

export const ProductEmpty = {
  _id: '',
  name: '',
  discount: 0,
  costPrice: 0,
  price: 0,
  description: '',
  picture: '',
  createdAt: 0,
  seoTitle: '',
}

interface ProductState {
  count: number
  page_size: number
  products: Product[]
  loading: boolean
  selectedProducts: Product[]
  searchedProducts: Product[]
  isAllChecked: boolean
  productForm: Product
  setForm: (key: keyof Product, value: Product[keyof Product]) => void
  resetForm: () => void
  getProducts: (
    url: string,
    setMessage: (message: string, isError: boolean) => void
  ) => Promise<void>
  getProduct: (
    url: string,
    setMessage: (message: string, isError: boolean) => void
  ) => Promise<void>
  setProcessedResults: (data: FetchResponse) => void
  setLoading?: (loading: boolean) => void
  massDelete: (
    url: string,
    selectedProducts: Record<string, unknown>,
    setMessage: (message: string, isError: boolean) => void
  ) => Promise<void>
  deleteItem: (
    url: string,
    setMessage: (message: string, isError: boolean) => void,
    setLoading?: (loading: boolean) => void
  ) => Promise<void>
  updateProduct: (
    url: string,
    updatedItem: FormData | Record<string, unknown>,
    setMessage: (message: string, isError: boolean) => void,
    redirect?: () => void
  ) => Promise<void>
  postProduct: (
    url: string,
    data: FormData | Record<string, unknown>,
    setMessage: (message: string, isError: boolean) => void,
    redirect?: () => void
  ) => Promise<void>
  toggleChecked: (index: number) => void
  toggleActive: (index: number) => void
  toggleAllSelected: () => void
  reshuffleResults: () => void
  searchProducts: (url: string) => void
}

const ProductStore = create<ProductState>((set) => ({
  count: 0,
  page_size: 0,
  products: [],
  loading: false,
  selectedProducts: [],
  searchedProducts: [],
  isAllChecked: false,
  productForm: ProductEmpty,
  setForm: (key, value) =>
    set((state) => ({
      productForm: {
        ...state.productForm,
        [key]: value,
      },
    })),

  resetForm: () =>
    set({
      productForm: ProductEmpty,
    }),

  setProcessedResults: ({ count, page_size, results }: FetchResponse) => {
    if (results) {
      const updatedResults = results.map((item: Product) => ({
        ...item,
        isChecked: false,
        isActive: false,
      }))

      set({
        count,
        page_size,
        products: updatedResults,
      })
    }
  },

  setLoading: (loadState: boolean) => {
    set({ loading: loadState })
  },

  getProducts: async (
    url: string,
    setMessage: (message: string, isError: boolean) => void
  ) => {
    try {
      const response = await apiRequest<FetchResponse>(url, {
        setMessage,
        setLoading: ProductStore.getState().setLoading,
      })
      const data = response?.data
      if (data) {
        ProductStore.getState().setProcessedResults(data)
      }
    } catch (error: unknown) {
      console.log(error)
    }
  },

  getProduct: async (
    url: string,
    setMessage: (message: string, isError: boolean) => void
  ) => {
    try {
      const response = await apiRequest<FetchResponse>(url, {
        setMessage,
        setLoading: ProductStore.getState().setLoading,
      })
      const data = response?.data
      if (data) {
        set({ productForm: data.data })
      }
    } catch (error: unknown) {
      console.log(error)
    }
  },

  reshuffleResults: async () => {
    set((state) => ({
      products: state.products.map((item: Product) => ({
        ...item,
        isChecked: false,
        isActive: false,
      })),
    }))
  },

  searchProducts: _debounce(async (url: string) => {
    const response = await apiRequest<FetchResponse>(url, {
      setLoading: ProductStore.getState().setLoading,
    })
    const results = response?.data.results
    if (results) {
      set({ searchedProducts: results })
    }
  }, 1000),

  massDelete: async (
    url,
    selectedProducts,
    setMessage: (message: string, isError: boolean) => void
  ) => {
    const response = await apiRequest<FetchResponse>(url, {
      method: 'PATCH',
      body: selectedProducts,
      setMessage,
      setLoading: ProductStore.getState().setLoading,
    })
    const data = response?.data
    console.log(data)
    if (data) {
      ProductStore.getState().setProcessedResults(data)
    }
  },

  deleteItem: async (
    url: string,
    setMessage: (message: string, isError: boolean) => void,
    setLoading?: (loading: boolean) => void
  ) => {
    const response = await apiRequest<FetchResponse>(url, {
      method: 'DELETE',
      setMessage,
      setLoading,
    })
    const data = response?.data
    if (data) {
      ProductStore.getState().setProcessedResults(data)
    }
  },

  updateProduct: async (url, updatedItem, setMessage, redirect) => {
    set({ loading: true })
    const response = await apiRequest<FetchResponse>(url, {
      method: 'PATCH',
      body: updatedItem,
      setMessage,
      setLoading: ProductStore.getState().setLoading,
    })
    if (response?.data) {
      ProductStore.getState().setProcessedResults(response.data)
    }
    if (redirect) redirect()
  },

  postProduct: async (url, updatedItem, setMessage, redirect) => {
    set({ loading: true })
    const response = await apiRequest<FetchResponse>(url, {
      method: 'POST',
      body: updatedItem,
      setMessage,
      setLoading: ProductStore.getState().setLoading,
    })
    if (response?.data) {
      ProductStore.getState().setProcessedResults(response.data)
    }

    if (redirect) redirect()
  },

  toggleActive: (index: number) => {
    set((state) => {
      const isCurrentlyActive = state.products[index]?.isActive
      const updatedResults = state.products.map((tertiary, idx) => ({
        ...tertiary,
        isActive: idx === index ? !isCurrentlyActive : false,
      }))
      return {
        products: updatedResults,
      }
    })
  },

  toggleChecked: (index: number) => {
    set((state) => {
      const updatedResults = state.products.map((tertiary, idx) =>
        idx === index
          ? { ...tertiary, isChecked: !tertiary.isChecked }
          : tertiary
      )

      const isAllChecked = updatedResults.every(
        (tertiary) => tertiary.isChecked
      )
      const updatedSelectedProducts = updatedResults.filter(
        (tertiary) => tertiary.isChecked
      )

      return {
        products: updatedResults,
        selectedProducts: updatedSelectedProducts,
        isAllChecked,
      }
    })
  },

  toggleAllSelected: () => {
    set((state) => {
      const isAllChecked =
        state.products.length === 0 ? false : !state.isAllChecked
      const updatedResults = state.products.map((item) => ({
        ...item,
        isChecked: isAllChecked,
      }))

      const updatedSelectedProducts = isAllChecked ? updatedResults : []

      return {
        products: updatedResults,
        selectedProducts: updatedSelectedProducts,
        isAllChecked,
      }
    })
  },
}))

export default ProductStore
