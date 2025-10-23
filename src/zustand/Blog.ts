import { create } from 'zustand'
import _debounce from 'lodash/debounce'
import apiRequest from '@/lib/axios'

interface FetchResponse {
  message: string
  count: number
  page_size: number
  results: Blog[]
  data: Blog
}

export interface Blog {
  _id: string
  title: string
  subtitle: string
  category: string
  content: string
  picture: string | File
  createdAt: Date | null | number
  isChecked?: boolean
  isActive?: boolean
}

export const BlogEmpty = {
  _id: '',
  title: '',
  subtitle: '',
  category: '',
  content: '',
  picture: '',
  createdAt: 0,
}

interface BlogState {
  count: number
  page_size: number
  blogs: Blog[]
  banners: Blog[]
  loading: boolean
  selectedBlogs: Blog[]
  searchedBlogs: Blog[]
  isAllChecked: boolean
  blogForm: Blog
  setForm: (key: keyof Blog, value: Blog[keyof Blog]) => void
  resetForm: () => void
  getBanners: (
    url: string,
    setMessage: (message: string, isError: boolean) => void
  ) => Promise<void>
  getBlogs: (
    url: string,
    setMessage: (message: string, isError: boolean) => void
  ) => Promise<void>
  getBlog: (
    url: string,
    setMessage: (message: string, isError: boolean) => void
  ) => Promise<void>
  setProcessedResults: (data: FetchResponse) => void
  setLoading?: (loading: boolean) => void
  massDelete: (
    url: string,
    selectedBlogs: Record<string, unknown>,
    setMessage: (message: string, isError: boolean) => void
  ) => Promise<void>
  deleteBlog: (
    url: string,
    setMessage: (message: string, isError: boolean) => void,
    setLoading?: (loading: boolean) => void
  ) => Promise<void>
  updateBlog: (
    url: string,
    updatedItem: FormData | Record<string, unknown>,
    setMessage: (message: string, isError: boolean) => void,
    redirect?: () => void
  ) => Promise<void>
  postBlog: (
    url: string,
    data: FormData | Record<string, unknown>,
    setMessage: (message: string, isError: boolean) => void,
    redirect?: () => void
  ) => Promise<void>
  toggleChecked: (index: number) => void
  toggleActive: (index: number) => void
  toggleAllSelected: () => void
  reshuffleResults: () => void
  searchBlogs: (url: string) => void
}

const BlogStore = create<BlogState>((set) => ({
  count: 0,
  page_size: 0,
  blogs: [],
  banners: [],
  loading: false,
  selectedBlogs: [],
  searchedBlogs: [],
  isAllChecked: false,
  blogForm: BlogEmpty,
  setForm: (key, value) =>
    set((state) => ({
      blogForm: {
        ...state.blogForm,
        [key]: value,
      },
    })),

  resetForm: () =>
    set({
      blogForm: BlogEmpty,
    }),

  setProcessedResults: ({ count, page_size, results }: FetchResponse) => {
    if (results) {
      const updatedResults = results.map((item: Blog) => ({
        ...item,
        isChecked: false,
        isActive: false,
      }))

      set({
        count,
        page_size,
        blogs: updatedResults,
      })
    }
  },

  setLoading: (loadState: boolean) => {
    set({ loading: loadState })
  },

  getBanners: async (url, setMessage) => {
    try {
      const response = await apiRequest<FetchResponse>(url, {
        setMessage,
        setLoading: BlogStore.getState().setLoading,
      })
      const data = response?.data
      if (data) {
        set({ banners: data.results })
      }
    } catch (error: unknown) {
      console.log(error)
    }
  },

  getBlogs: async (
    url: string,
    setMessage: (message: string, isError: boolean) => void
  ) => {
    try {
      const response = await apiRequest<FetchResponse>(url, {
        setMessage,
        setLoading: BlogStore.getState().setLoading,
      })
      const data = response?.data
      if (data) {
        BlogStore.getState().setProcessedResults(data)
      }
    } catch (error: unknown) {
      console.log(error)
    }
  },

  getBlog: async (url, setMessage) => {
    try {
      const response = await apiRequest<FetchResponse>(url, {
        setMessage,
        setLoading: BlogStore.getState().setLoading,
      })
      const data = response?.data
      if (data) {
        set({ blogForm: data.data })
      }
    } catch (error: unknown) {
      console.log(error)
    }
  },

  reshuffleResults: async () => {
    set((state) => ({
      blogs: state.blogs.map((item: Blog) => ({
        ...item,
        isChecked: false,
        isActive: false,
      })),
    }))
  },

  searchBlogs: _debounce(async (url: string) => {
    const response = await apiRequest<FetchResponse>(url, {
      setLoading: BlogStore.getState().setLoading,
    })
    const results = response?.data.results
    if (results) {
      set({ searchedBlogs: results })
    }
  }, 1000),

  massDelete: async (url, selectedBlogs, setMessage) => {
    const response = await apiRequest<FetchResponse>(url, {
      method: 'PATCH',
      body: selectedBlogs,
      setMessage,
      setLoading: BlogStore.getState().setLoading,
    })
    const data = response?.data
    console.log(data)
    if (data) {
      BlogStore.getState().setProcessedResults(data)
    }
  },

  deleteBlog: async (url, setMessage, setLoading) => {
    const response = await apiRequest<FetchResponse>(url, {
      method: 'DELETE',
      setMessage,
      setLoading,
    })
    const data = response?.data
    if (data) {
      BlogStore.getState().setProcessedResults(data)
    }
  },

  updateBlog: async (url, updatedItem, setMessage, redirect) => {
    set({ loading: true })
    const response = await apiRequest<FetchResponse>(url, {
      method: 'PATCH',
      body: updatedItem,
      setMessage,
      setLoading: BlogStore.getState().setLoading,
    })
    if (response?.data) {
      BlogStore.getState().setProcessedResults(response.data)
    }
    if (redirect) redirect()
  },

  postBlog: async (url, updatedItem, setMessage, redirect) => {
    set({ loading: true })
    const response = await apiRequest<FetchResponse>(url, {
      method: 'POST',
      body: updatedItem,
      setMessage,
      setLoading: BlogStore.getState().setLoading,
    })
    if (response?.data) {
      BlogStore.getState().setProcessedResults(response.data)
    }

    if (redirect) redirect()
  },

  toggleActive: (index: number) => {
    set((state) => {
      const isCurrentlyActive = state.blogs[index]?.isActive
      const updatedResults = state.blogs.map((tertiary, idx) => ({
        ...tertiary,
        isActive: idx === index ? !isCurrentlyActive : false,
      }))
      return {
        blogs: updatedResults,
      }
    })
  },

  toggleChecked: (index: number) => {
    set((state) => {
      const updatedResults = state.blogs.map((tertiary, idx) =>
        idx === index
          ? { ...tertiary, isChecked: !tertiary.isChecked }
          : tertiary
      )

      const isAllChecked = updatedResults.every(
        (tertiary) => tertiary.isChecked
      )
      const updatedSelectedBlogs = updatedResults.filter(
        (tertiary) => tertiary.isChecked
      )

      return {
        blogs: updatedResults,
        selectedBlogs: updatedSelectedBlogs,
        isAllChecked,
      }
    })
  },

  toggleAllSelected: () => {
    set((state) => {
      const isAllChecked =
        state.blogs.length === 0 ? false : !state.isAllChecked
      const updatedResults = state.blogs.map((item) => ({
        ...item,
        isChecked: isAllChecked,
      }))

      const updatedSelectedBlogs = isAllChecked ? updatedResults : []

      return {
        blogs: updatedResults,
        selectedBlogs: updatedSelectedBlogs,
        isAllChecked,
      }
    })
  },
}))

export default BlogStore
