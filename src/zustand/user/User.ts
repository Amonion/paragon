import { create } from 'zustand'
import _debounce from 'lodash/debounce'
import apiRequest from '@/lib/axios'
import { AuthStore } from './AuthStore'

interface FetchUser {
  count: number
  message: string
  id: string
  page_size: number
  followers: number
  isFollowed: boolean
  data: User
}

interface FetchUserResponse {
  count: number
  message: string
  page_size: number
  results: User[]
  data: User
}

interface UserState {
  userForm: User
  users: User[]
  count: number
  isAllChecked: boolean
  loading: boolean
  autLoading: boolean
  page: number
  page_size: number
  selectedUsers: User[]
  searchedUsers: User[]
  searchedUsersResult: User[]
  showProfileSheet: boolean
  deleteUser: (
    url: string,
    setMessage: (message: string, isError: boolean) => void
  ) => Promise<void>
  getUser: (
    url: string,
    setMessage: (message: string, isError: boolean) => void
  ) => Promise<void>
  getUsers: (
    url: string,
    setMessage: (message: string, isError: boolean) => void
  ) => Promise<void>
  massDeleteUsers: (
    url: string,
    selectedUsers: User[],
    setMessage: (message: string, isError: boolean) => void
  ) => Promise<void>
  resetForm: () => void
  reshuffleResults: () => void
  setForm: (key: keyof User, value: User[keyof User]) => void
  searchUser: (url: string) => void
  setSearchedUserResult: () => void
  setProcessedResults: (data: FetchUserResponse) => void
  setShowProfileSheet: (status: boolean) => void
  toggleChecked: (index: number) => void
  toggleActive: (index: number) => void
  toggleAllSelected: () => void
  updateUser: (
    url: string,
    updatedItem: FormData | Record<string, unknown>,
    setMessage: (message: string, isError: boolean) => void
  ) => Promise<void>
  updateAuthUser: (
    url: string,
    updatedItem: FormData | Record<string, unknown>,
    setMessage: (message: string, isError: boolean) => void
  ) => Promise<void>
  sendUsersEmail: (
    url: string,
    updatedItem: FormData | Record<string, unknown>,
    setMessage: (message: string, isError: boolean) => void
  ) => Promise<void>
  updateMyUser: (
    url: string,
    updatedItem: FormData | Record<string, unknown>,
    setMessage: (message: string, isError: boolean) => void
  ) => Promise<void>
}

export const UserEmpty = {
  _id: '',
  createdAt: new Date(),
  fullName: '',
  email: '',
  isTwoFactor: false,
  isSuspended: false,
  isFirstTime: false,
  phone: '',
  picture: '',
  staffPositions: [],
  staffRanking: 0,
  username: '',
  status: '',
  newPassword: '',
  password: '',
  confirmPassword: '',
}

export const UserStore = create<UserState>((set) => ({
  userForm: UserEmpty,
  users: [],
  count: 0,
  isAllChecked: false,
  loading: false,
  autLoading: false,
  page: 1,
  page_size: 20,
  selectedUsers: [],
  searchedUsers: [],
  searchedUsersResult: [],
  showProfileSheet: false,
  deleteUser: async (
    url: string,
    setMessage: (message: string, isError: boolean) => void
  ) => {
    set({
      loading: true,
    })
    const response = await apiRequest<FetchUser>(url, {
      method: 'PATCH',
      setMessage,
    })
    if (response) {
    }
  },

  getUser: async (
    url: string,
    setMessage: (message: string, isError: boolean) => void
  ) => {
    try {
      const response = await apiRequest<FetchUserResponse>(url, {
        setMessage,
      })
      const data = response?.data
      if (data) {
        set({
          userForm: data.data,
          loading: false,
        })
      }
    } catch (error: unknown) {
      if (error) return
    }
  },

  getUsers: async (
    url: string,
    setMessage: (message: string, isError: boolean) => void
  ) => {
    try {
      const response = await apiRequest<FetchUserResponse>(url, { setMessage })
      const data = response?.data
      if (data) {
        UserStore.getState().setProcessedResults(data)
      }
    } catch (error: unknown) {
      console.log(error)
    }
  },

  massDeleteUsers: async (
    url: string,
    selectedUsers: User[],
    setMessage: (message: string, isError: boolean) => void
  ) => {
    try {
      set({ loading: true })
      await apiRequest<FetchUserResponse>(url, {
        method: 'POST',
        body: selectedUsers,
        setMessage,
      })
    } catch (error) {
      console.log(error)
    }
  },

  resetForm: () =>
    set({
      userForm: UserEmpty,
    }),

  reshuffleResults: async () => {
    set((state) => ({
      users: state.users.map((item: User) => ({
        ...item,
        isChecked: false,
        isActive: false,
      })),
    }))
  },

  setForm: (key, value) =>
    set((state) => ({
      userForm: {
        ...state.userForm,
        [key]: value,
      },
    })),

  setSearchedUserResult: () => {
    set((prev) => {
      return {
        hasMoreSearch: prev.searchedUsersResult.length > prev.page_size,
        searchedUsers: prev.searchedUsersResult,
        searchedUsersResult: [],
      }
    })
  },

  searchUser: _debounce(async (url: string) => {
    try {
      const response = await apiRequest<FetchUserResponse>(url)
      if (response) {
        const { results } = response?.data
        const updatedResults = results.map((item: User) => ({
          ...item,
          isChecked: false,
          isActive: false,
        }))
        set({ searchedUsers: updatedResults })
      }
    } catch (error: unknown) {
      console.log(error)
    }
  }, 1000),

  setProcessedResults: ({ count, page_size, results }: FetchUserResponse) => {
    const updatedResults = results.map((item: User) => ({
      ...item,
      isChecked: false,
      isActive: false,
    }))

    set({
      loading: false,
      count,
      page_size,
      users: updatedResults,
    })
  },

  setShowProfileSheet: (status: boolean) => {
    set({ showProfileSheet: status })
  },

  toggleActive: (index: number) => {
    set((state) => {
      const isCurrentlyActive = state.users[index]?.isActive
      const updatedResults = state.users.map((tertiary, idx) => ({
        ...tertiary,
        isActive: idx === index ? !isCurrentlyActive : false,
      }))
      return {
        users: updatedResults,
      }
    })
  },

  toggleAllSelected: () => {
    set((state) => {
      const isAllChecked =
        state.users.length === 0 ? false : !state.isAllChecked
      const updatedResults = state.users.map((item) => ({
        ...item,
        isChecked: isAllChecked,
      }))

      const updatedSelectedItems = isAllChecked ? updatedResults : []

      return {
        users: updatedResults,
        selectedUsers: updatedSelectedItems,
        isAllChecked,
      }
    })
  },

  toggleChecked: (index: number) => {
    set((state) => {
      const updatedResults = state.users.map((tertiary, idx) =>
        idx === index
          ? { ...tertiary, isChecked: !tertiary.isChecked }
          : tertiary
      )

      const isAllChecked = updatedResults.every(
        (tertiary) => tertiary.isChecked
      )
      const updatedSelectedItems = updatedResults.filter(
        (tertiary) => tertiary.isChecked
      )

      return {
        users: updatedResults,
        selectedUsers: updatedSelectedItems,
        isAllChecked: isAllChecked,
      }
    })
  },

  sendUsersEmail: async (
    url: string,
    updatedItem: FormData | Record<string, unknown>,
    setMessage: (message: string, isError: boolean) => void
  ) => {
    set({ loading: true })
    await apiRequest<FetchUser>(url, {
      method: 'POST',
      body: updatedItem,
      setMessage,
    })
  },

  updateUser: async (url, updatedItem, setMessage) => {
    try {
      set({ loading: true })
      const response = await apiRequest<FetchUser>(url, {
        method: 'PATCH',
        body: updatedItem,
        setMessage,
      })
      const data = response?.data
      if (data) {
        AuthStore.getState().setUser(data.data)
      }
    } catch (error) {
      console.log(error)
    } finally {
      set({ loading: false })
    }
  },

  updateAuthUser: async (url, updatedItem, setMessage) => {
    try {
      set({ autLoading: true })
      await apiRequest<FetchUser>(url, {
        method: 'POST',
        body: updatedItem,
        setMessage,
      })
    } catch (error) {
      console.log(error)
    } finally {
      set({ autLoading: false })
    }
  },

  updateMyUser: async (
    url: string,
    updatedItem: FormData | Record<string, unknown>,
    setMessage: (message: string, isError: boolean) => void
  ) => {
    try {
      set({ loading: true })
      const response = await apiRequest<FetchUser>(url, {
        method: 'PATCH',
        body: updatedItem,
        setMessage,
      })
      const data = response?.data
      if (data) {
        if (!url.includes('follow')) {
          AuthStore.getState().setUser(data.data)
        }
        set({
          userForm: data.data,
          loading: false,
        })
      }
    } catch (error) {
      console.log(error)
    } finally {
      set({ loading: false })
    }
  },
}))

export interface User {
  _id: string
  createdAt: Date
  fullName: string
  email: string
  isSuspended: boolean
  isFirstTime: boolean
  isTwoFactor: boolean
  isActive?: boolean
  isChecked?: boolean
  phone: string
  picture: string | File
  staffPositions: string[]
  staffRanking: number
  status: string
  username: string
  newPassword: string
  password: string
  confirmPassword: string
}
