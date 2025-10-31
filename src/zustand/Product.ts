import { create } from 'zustand'
import _debounce from 'lodash/debounce'
import apiRequest from '@/lib/axios'

interface FetchResponse {
  message: string
  count: number
  page_size: number
  results: Product[]
  data: Product
  result: FetchResponse
}

export interface Cart {
  _id: string
  customer: string
  username: string
  products: Product[]
  totalItems: number
  items: number
  totalAmount: number
  createdAt: Date | null | number
  isChecked?: boolean
  isActive?: boolean
}
export const CartEmpty = {
  _id: '',
  customer: '',
  username: '',
  products: [],
  totalItems: 0,
  items: 0,
  totalAmount: 0,
  createdAt: null,
}

export interface Product {
  _id: string
  name: string
  purchaseUnit: string
  discount: number
  cartUnits: number
  unitPerPurchase: number
  units: number
  costPrice: number
  price: number
  description: string
  picture: string | File
  createdAt: Date | null | number
  seoTitle: string
  isBuyable: boolean
  isChecked?: boolean
  isActive?: boolean
}

export const ProductEmpty = {
  _id: '',
  name: '',
  purchaseUnit: '',
  discount: 0,
  units: 0,
  unitPerPurchase: 1,
  costPrice: 0,
  price: 0,
  cartUnits: 0,
  description: '',
  picture: '',
  createdAt: 0,
  seoTitle: '',
  isBuyable: false,
}

interface ProductState {
  count: number
  page_size: number
  totalAmount: number
  products: Product[]
  cartProducts: Product[]
  cart: Cart
  loading: boolean
  showStocking: boolean
  selectedProducts: Product[]
  searchedProducts: Product[]
  isAllChecked: boolean
  productForm: Product
  setForm: (key: keyof Product, value: Product[keyof Product]) => void
  setToCart: (p: Product, isAdd: boolean) => void
  setShowStocking: (status: boolean) => void
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
  createTransaction: (
    url: string,
    data: FormData | Record<string, unknown>,
    setMessage: (message: string, isError: boolean) => void,
    redirect?: () => void
  ) => Promise<void>
  postStocking: (
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
  totalAmount: 0,
  cart: CartEmpty,
  products: [],
  cartProducts: [],
  productStockings: [],
  loading: false,
  showStocking: false,
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

  setToCart: (p, isAdded) => {
    set((prev) => {
      const existing = prev.cartProducts.find((item) => item._id === p._id)

      const updateProductsCartUnits = (id: string, newUnits: number) =>
        prev.products.map((prod) =>
          prod._id === id ? { ...prod, cartUnits: newUnits } : prod
        )

      let updatedCart: typeof prev.cartProducts = []

      if (existing) {
        const newUnits = isAdded
          ? existing.cartUnits + 1
          : existing.cartUnits - 1

        if (!isAdded && newUnits <= 0) {
          updatedCart = prev.cartProducts.filter((item) => item._id !== p._id)
          return {
            cartProducts: updatedCart,
            products: updateProductsCartUnits(p._id, 0),
            totalAmount: updatedCart.reduce(
              (sum, item) => sum + item.cartUnits * (item.price || 0),
              0
            ),
          }
        }

        updatedCart = prev.cartProducts.map((item) =>
          item._id === p._id ? { ...item, cartUnits: newUnits } : item
        )

        return {
          cartProducts: updatedCart,
          products: updateProductsCartUnits(p._id, newUnits),
          totalAmount: updatedCart.reduce(
            (sum, item) => sum + item.cartUnits * (item.price || 0),
            0
          ),
        }
      }

      if (isAdded) {
        updatedCart = [...prev.cartProducts, { ...p, cartUnits: 1 }]

        return {
          cartProducts: updatedCart,
          products: updateProductsCartUnits(p._id, 1),
          totalAmount: updatedCart.reduce(
            (sum, item) => sum + item.cartUnits * (item.price || 0),
            0
          ),
        }
      }

      return prev
    })
  },

  setShowStocking: (loadState: boolean) => {
    set({ showStocking: loadState })
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

  createTransaction: async (url, body, setMessage, redirect) => {
    try {
      const response = await apiRequest<FetchResponse>(url, {
        method: 'POST',
        body,
        setMessage,
      })
      const data = response?.data
      if (data) {
        ProductStore.getState().setProcessedResults(data.result)
      }
      if (redirect) {
        redirect()
        set({ cartProducts: [], totalAmount: 0 })
      }
    } catch (error: unknown) {
      console.log(error)
    }
  },

  postStocking: async (url, updatedItem, setMessage, redirect) => {
    await apiRequest<FetchResponse>(url, {
      method: 'POST',
      body: updatedItem,
      setMessage,
      setLoading: ProductStore.getState().setLoading,
    })

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
