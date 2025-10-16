import { create } from 'zustand'
import _debounce from 'lodash/debounce'
import apiRequest from '@/lib/axios'

interface FetchPostResponse {
  count: number
  message: string
  page_size: number
  results: Post[]
}

interface PostResponse {
  message: string
  data: Post
}

export interface Media {
  source: string
  type: string
  preview: string
}

export interface Poll {
  picture: string
  text: string
  userId: string
  index: number
  percent: number
}

export interface IMedia {
  type: string
  src: string
  postId: string
  replies: number
  preview: string
  content: string
}

export interface Post {
  _id: string
  username: string
  userId: string
  postId: string
  backgroundColor: string
  displayName: string
  content: string
  media: Media[]
  polls: Poll[]
  users: string[]
  picture: string
  country: string
  isSelected: boolean
  isVerified: boolean
  hated: boolean
  totalVotes: number
  hates: number
  shares: number
  bookmarks: number
  replies: number
  views: number
  likes: number
  reposts: number
  createdAt: Date | null | string
  message: string
  followed: boolean
  muted: boolean
  liked: boolean
  bookmarked: boolean
  shared: boolean
  viewed: boolean
  isChecked?: boolean
  isActive?: boolean
}

export const PostEmpty = {
  _id: '',
  username: '',
  userId: '',
  postId: '',
  backgroundColor: '',
  displayName: '',
  content: '',
  media: [],
  polls: [],
  users: [],
  picture: '',
  country: '',
  isSelected: false,
  isVerified: false,
  hated: false,
  totalVotes: 0,
  hates: 0,
  shares: 0,
  bookmarks: 0,
  replies: 0,
  views: 0,
  likes: 0,
  reposts: 0,
  createdAt: '',
  message: '',
  followed: false,
  muted: false,
  liked: false,
  bookmarked: false,
  shared: false,
  viewed: false,
}

interface PostState {
  links: { next: string | null; previous: string | null } | null
  count: number
  page_size: number
  currentPage: number
  currentIndex: number
  postResults: Post[]
  mediaResults: IMedia[]
  selectedMedia: IMedia | null
  followingPostResults: Post[]
  bookmarkedPostResults: Post[]
  loading: boolean
  error: string | null
  successs?: string | null
  selectedPosts: Post[]
  searchedPostResult: Post[]
  searchedPosts: Post[]
  hasMore: boolean
  isPlaying: boolean
  isMobile: boolean
  fitMode: boolean
  hasMoreSearch: boolean
  hasMoreBookmarks: boolean
  hasMoreFollowing: boolean
  postForm: Post
  setForm: (key: keyof Post, value: Post[keyof Post]) => void
  resetForm: () => void
  clearSearchedPosts: () => void
  getPosts: (
    url: string,
    setMessage: (message: string, isError: boolean) => void
  ) => Promise<void>
  addMorePosts: (
    url: string,
    setMessage: (message: string, isError: boolean) => void
  ) => Promise<void>
  getFollowingPosts: (
    url: string,
    setMessage: (message: string, isError: boolean) => void
  ) => Promise<void>
  getBookmarkedPosts: (
    url: string,
    setMessage: (message: string, isError: boolean) => void
  ) => Promise<void>
  getQueryPosts: (url: string) => Promise<void>
  getAPost: (
    url: string,
    setMessage: (message: string, isError: boolean) => void
  ) => Promise<void>
  setProcessedResults: (data: FetchPostResponse) => void
  processMoreResults: (data: FetchPostResponse) => void
  setFollowingResults: (data: FetchPostResponse) => void
  setBookmarkedResults: (data: FetchPostResponse) => void
  removePosts: (id: string) => void
  setCurrentPage: (page: number) => void
  setLoading?: (loading: boolean) => void
  massDelete: (
    url: string,
    refreshUrl: string,
    selectedPosts: Post[],
    setMessage: (message: string, isError: boolean) => void
  ) => Promise<void>
  deleteItem: (
    url: string,
    id: string,
    setMessage: (message: string, isError: boolean) => void,
    refreshUrl?: string
  ) => Promise<void>
  selectPoll: (
    url: string,
    updatedItem: FormData | Record<string, unknown>
  ) => Promise<void>
  repostItem: (
    url: string,
    updatedItem: FormData | Record<string, unknown>
  ) => Promise<void>
  updatePinPost: (
    url: string,
    updatedItem: FormData | Record<string, unknown>
  ) => Promise<void>
  updatePost: (
    url: string,
    updatedItem: FormData | Record<string, unknown>,
    setMessage: (message: string, isError: boolean) => void,
    refreshUrl?: string
  ) => Promise<void>
  postItem: (
    url: string,
    updatedItem: FormData | Record<string, unknown>,
    setMessage: (message: string, isError: boolean) => void,
    setProgress?: (int: number) => void
  ) => Promise<void>
  togglePost: (index: number) => void
  toggleActive: (id: string) => void
  reshuffleResults: () => void
  setSearchedResult: () => void
  searchItem: (url: string) => void
  addMoreSearchItems: (url: string) => void
  setIsMobile: (mobile: boolean) => void
  setSelectedMedia: (media: IMedia | null) => void
  setFitMode: (mode: boolean) => void
  setCurrentIndex: (index: number) => void
}

export const PostStore = create<PostState>((set, get) => ({
  links: null,
  count: 0,
  page_size: 20,
  currentPage: 1,
  currentIndex: 0,
  postResults: [],
  mediaResults: [],
  followingPostResults: [],
  bookmarkedPostResults: [],
  selectedMedia: null,
  loading: false,
  error: null,
  selectedPosts: [],
  searchedPostResult: [],
  searchedPosts: [],
  hasMore: false,
  hasMoreSearch: true,
  isPlaying: true,
  isMobile: false,
  fitMode: false,
  hasMoreBookmarks: false,
  hasMoreFollowing: false,
  postForm: PostEmpty,
  setForm: (key, value) =>
    set((state) => ({
      postForm: {
        ...state.postForm,
        [key]: value,
      },
    })),
  resetForm: () =>
    set({
      postForm: PostEmpty,
    }),
  setIsMobile: (mobile: boolean) =>
    set({
      isMobile: mobile,
    }),
  setSelectedMedia: (media) =>
    set({
      selectedMedia: media,
    }),
  setFitMode: (mode: boolean) =>
    set({
      fitMode: mode,
    }),
  setCurrentIndex: (index: number) =>
    set({
      currentIndex: index,
    }),

  processMoreResults: ({ count, results }: FetchPostResponse) => {
    set((state) => {
      const updatedResults = results.map((item: Post) => ({
        ...item,
        isChecked: false,
        isActive: false,
      }))

      const existingIds = new Set(state.postResults.map((post) => post._id))
      const uniqueResults = updatedResults.filter(
        (post) => !existingIds.has(post._id)
      )

      const mediaResults: IMedia[] = []
      updatedResults.forEach((post) => {
        if (Array.isArray(post.media) && post.media.length > 0) {
          post.media.forEach((mediaItem) => {
            mediaResults.push({
              postId: post._id,
              src: mediaItem.source,
              preview: mediaItem.preview,
              type: mediaItem.type,
              content: post.content,
              replies: post.replies,
            })
          })
        }
      })

      return {
        hasMore: state.page_size === results.length,
        loading: false,
        count,
        postResults: [...state.postResults, ...uniqueResults],
        mediaResults: [...state.mediaResults, ...mediaResults],
      }
    })
  },

  setProcessedResults: ({ count, results }: FetchPostResponse) => {
    set((state) => {
      const updatedResults = results.map((item: Post) => ({
        ...item,
        isChecked: false,
        isActive: false,
      }))

      const mediaResults: IMedia[] = []
      updatedResults.forEach((post) => {
        if (Array.isArray(post.media) && post.media.length > 0) {
          post.media.forEach((mediaItem) => {
            mediaResults.push({
              postId: post._id,
              src: mediaItem.source,
              preview: mediaItem.preview,
              type: mediaItem.type,
              content: post.content,
              replies: post.replies,
            })
          })
        }
      })

      return {
        hasMore: state.page_size === results.length,
        loading: false,
        count,
        postResults: updatedResults,
        mediaResults: mediaResults,
      }
    })
  },

  setFollowingResults: ({ count, results }: FetchPostResponse) => {
    set((state) => {
      const updatedResults = results.map((item: Post) => ({
        ...item,
        isChecked: false,
        isActive: false,
      }))

      const existingIds = new Set(
        state.followingPostResults.map((post) => post._id)
      )
      const uniqueResults = updatedResults.filter(
        (post) => !existingIds.has(post._id)
      )

      return {
        loading: false,
        hasMoreFollowing: state.page_size === results.length,
        count,
        followingPostResults: [...state.followingPostResults, ...uniqueResults],
      }
    })
  },

  setBookmarkedResults: ({ count, page_size, results }: FetchPostResponse) => {
    set((state) => {
      const updatedResults = results.map((item: Post) => ({
        ...item,
        isChecked: false,
        isActive: false,
      }))

      const existingIds = new Set(
        state.bookmarkedPostResults.map((post) => post._id)
      )
      const uniqueResults = updatedResults.filter(
        (post) => !existingIds.has(post._id)
      )

      return {
        loading: false,
        hasMoreBookmarks: state.page_size === results.length,
        count,
        page_size,
        bookmarkedPostResults: [
          ...state.bookmarkedPostResults,
          ...uniqueResults,
        ],
      }
    })
  },

  removePosts: (id: string) => {
    set((state) => ({
      postResults: state.postResults.filter((post) => post.postId !== id),
    }))
  },

  setSearchedResult: () => {
    set((prev) => {
      return { searchedPosts: prev.searchedPostResult, searchedPostResult: [] }
    })
  },

  clearSearchedPosts: () => {
    set({ searchedPostResult: [] })
  },

  setCurrentPage: (page: number) => {
    set({ currentPage: page })
  },

  setLoading: (loadState: boolean) => {
    set({ loading: loadState })
  },

  getAPost: async (
    url: string,
    setMessage: (message: string, isError: boolean) => void
  ) => {
    try {
      const response = await apiRequest<PostResponse>(url, {
        setMessage,
        setLoading: PostStore.getState().setLoading,
      })
      const data = response?.data
      if (data) {
        set({
          postForm: data.data,
          loading: false,
        })
      }
    } catch (error: unknown) {
      console.log(error)
    }
  },

  getPosts: async (
    url: string,
    setMessage: (message: string, isError: boolean) => void
  ) => {
    try {
      const response = await apiRequest<FetchPostResponse>(url, {
        setMessage,
        setLoading: PostStore.getState().setLoading,
      })
      const data = response?.data
      if (data) {
        PostStore.getState().setProcessedResults(data)
      }
    } catch (error: unknown) {
      console.log(error)
    }
  },

  getQueryPosts: async (url: string) => {
    try {
      const response = await apiRequest<FetchPostResponse>(url, {
        setLoading: PostStore.getState().setLoading,
      })
      const data = response?.data
      if (data) {
        set((prev) => {
          return {
            searchedPosts: data.results,
            hasMoreSearch: data.results.length === prev.page_size,
          }
        })
      }
    } catch (error: unknown) {
      console.log(error)
    }
  },

  addMorePosts: async (
    url: string,
    setMessage: (message: string, isError: boolean) => void
  ) => {
    try {
      const response = await apiRequest<FetchPostResponse>(url, {
        setMessage,
        setLoading: PostStore.getState().setLoading,
      })
      const data = response?.data
      if (data) {
        PostStore.getState().processMoreResults(data)
      }
    } catch (error: unknown) {
      console.log(error)
    }
  },

  addMoreSearchItems: async (url: string) => {
    try {
      const response = await apiRequest<FetchPostResponse>(url, {
        setLoading: PostStore.getState().setLoading,
      })
      const { results } = response?.data
      if (results) {
        set((prev) => {
          return {
            searchedPosts: [...prev.searchedPosts, ...results],
            hasMoreSearch: results.length === prev.page_size,
          }
        })
      }
    } catch (error: unknown) {
      console.log(error)
    }
  },

  getFollowingPosts: async (
    url: string,
    setMessage: (message: string, isError: boolean) => void
  ) => {
    try {
      const response = await apiRequest<FetchPostResponse>(url, {
        setMessage,
        setLoading: PostStore.getState().setLoading,
      })
      const data = response?.data
      if (data) {
        PostStore.getState().setFollowingResults(data)
      }
    } catch (error: unknown) {
      console.log(error)
    }
  },

  getBookmarkedPosts: async (
    url: string,
    setMessage: (message: string, isError: boolean) => void
  ) => {
    try {
      const response = await apiRequest<FetchPostResponse>(url, {
        setMessage,
        setLoading: PostStore.getState().setLoading,
      })
      const data = response?.data
      if (data) {
        PostStore.getState().setBookmarkedResults(data)
      }
    } catch (error: unknown) {
      console.log(error)
    }
  },

  reshuffleResults: async () => {
    set((state) => ({
      postResults: state.postResults.map((item: Post) => ({
        ...item,
        isChecked: false,
        isActive: false,
      })),
    }))
  },

  searchItem: _debounce(async (url: string) => {
    try {
      set({ loading: true })
      const response = await apiRequest<FetchPostResponse>(url)
      const { results } = response?.data
      if (results) {
        set({ searchedPostResult: results })
      }
    } catch (error) {
      console.log(error)
    } finally {
      set({ loading: false })
    }
  }, 1000),

  massDelete: async (
    url: string,
    refreshUrl: string,
    selectedPosts: Post[],
    setMessage: (message: string, isError: boolean) => void
  ) => {
    set({
      loading: true,
    })
    const response = await apiRequest<Post>(url, {
      method: 'POST',
      body: selectedPosts,
      setMessage,
    })
    if (response) {
      const getPosts = get().getPosts
      getPosts(refreshUrl, setMessage)
    }
  },

  deleteItem: async (
    url: string,
    id: string,
    setMessage: (message: string, isError: boolean) => void
  ) => {
    set({
      loading: true,
    })
    const response = await apiRequest<Post>(url, {
      method: 'DELETE',
      setMessage,
    })
    if (response) {
      set((state) => {
        const updatedResults = state.postResults.filter(
          (post) => post._id !== id
        )
        return {
          postResults: updatedResults,
          loading: false,
        }
      })
    }
  },

  postItem: async (
    url: string,
    updatedItem: FormData | Record<string, unknown>,
    setMessage: (message: string, isError: boolean) => void,
    setProgress?: (int: number) => void
  ) => {
    set({ loading: true, error: null })
    const response = await apiRequest<Post>(url, {
      method: 'POST',
      body: updatedItem,
      setMessage,
      setProgress,
      setLoading: PostStore.getState().setLoading,
    })
    const data = response?.data
    if (data) {
      PostStore.getState().postResults.push(data)
    }
  },

  repostItem: async (
    url: string,
    updatedItem: FormData | Record<string, unknown>
  ) => {
    try {
      set({ loading: true, error: null })
      await apiRequest<PostResponse>(url, {
        method: 'POST',
        body: updatedItem,
      })
    } catch (error) {
      console.log(error)
    } finally {
      set({ loading: false, error: null })
    }
  },
  updatePinPost: async (
    url: string,
    updatedItem: FormData | Record<string, unknown>
  ) => {
    try {
      set({ loading: true, error: null })
      await apiRequest<PostResponse>(url, {
        method: 'POST',
        body: updatedItem,
      })
    } catch (error) {
      console.log(error)
    } finally {
      set({ loading: false, error: null })
    }
  },

  updatePost: async (
    url: string,
    updatedItem: FormData | Record<string, unknown>,
    setMessage: (message: string, isError: boolean) => void
  ) => {
    set({ loading: true, error: null })
    const response = await apiRequest<PostResponse>(url, {
      method: 'PATCH',
      body: updatedItem,
      setMessage,
      setLoading: PostStore.getState().setLoading,
    })
    const data = response?.data?.data
    if (data) {
      PostStore.setState((state) => ({
        postResults: state.postResults.map((post) =>
          post.userId === data.userId
            ? { ...post, followed: data.followed, isActive: false }
            : post
        ),
      }))
    }
  },

  selectPoll: async (
    url: string,
    updatedItem: FormData | Record<string, unknown>
  ) => {
    set({ loading: true, error: null })
    await apiRequest<PostResponse>(url, {
      method: 'POST',
      body: updatedItem,
    })
  },

  toggleActive: (id: string) => {
    set((state) => {
      const updatedResults = state.postResults.map((tertiary) => ({
        ...tertiary,
        isActive: tertiary._id === id ? !tertiary.isActive : false,
      }))
      return {
        postResults: updatedResults,
      }
    })
  },

  togglePost: (index: number) => {
    set((state) => {
      const updatedResults = state.postResults.map((tertiary, idx) =>
        idx === index
          ? { ...tertiary, isChecked: !tertiary.isChecked }
          : tertiary
      )

      const updatedSelectedPosts = updatedResults.filter(
        (tertiary) => tertiary.isChecked
      )

      return {
        postResults: updatedResults,
        selectedPosts: updatedSelectedPosts,
      }
    })
  },
}))
