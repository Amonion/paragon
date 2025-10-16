import { create } from 'zustand'
import apiRequest from '@/lib/axios'

interface FetchMomentResponse {
  count: number
  message: string
  id: string
  page_size: number
  momentIndex: number
  mediaIndex: number
  results: Moment[]
  moment: Moment
}

export interface MomentMedia {
  type: string
  src: string
  preview: string
  content: string
  backgroundColor: string
  duration: number
  isViewed: boolean
}
export const MomentMediaEmpty = {
  type: '',
  backgroundColor: '#da3986',
  src: '',
  preview: '',
  content: '',
  duration: 0,
  isViewed: false,
}

export interface Moment {
  media: MomentMedia[]
  _id: string
  username: string
  displayName: string
  picture: string
  createdAt: Date | null
}

export const MomentEmpty = {
  media: [],
  _id: '',
  username: '',
  displayName: '',
  picture: '',
  createdAt: null,
}

interface MomentState {
  count: number
  page_size: number
  currentPage: number
  activeMomentIndex: number
  activeMomentMediaIndex: number
  activeMoment: Moment
  activeMomentMedia: MomentMedia
  momentMedia: MomentMedia
  moments: Moment[]
  showOptions: boolean
  editingId: string
  loading: boolean
  moment: Moment
  editingIndex: number
  hasMore: boolean
  isPlaying: boolean
  showMoment: boolean
  isEditing: boolean
  userHasMoment: boolean
  openMomentModal: (index: number) => void
  clearMoment: () => void
  changeActiveMomentMedia: (index: number, int: number) => void
  setShowOptions: (state: boolean) => void
  setShowMoment: (state: boolean) => void
  setIsPlaying: (state: boolean) => void
  setIsEditing: (state: boolean, id: string, index: number) => void
  setForm: (key: keyof Moment, value: Moment[keyof Moment]) => void
  resetForm: () => void
  getMoments: (
    url: string,
    setMessage: (message: string, isError: boolean) => void
  ) => Promise<void>
  setProcessedResults: (data: FetchMomentResponse) => void
  deleteMoment: (
    url: string,
    setMessage: (message: string, isError: boolean) => void
  ) => Promise<void>
  postItem: (
    url: string,
    updatedItem: FormData | Record<string, unknown>,
    setMessage: (message: string, isError: boolean) => void
  ) => Promise<void>
}

export const MomentStore = create<MomentState>((set) => ({
  count: 0,
  page_size: 20,
  currentPage: 1,
  editingIndex: 0,
  activeMomentIndex: 0,
  activeMomentMediaIndex: 0,
  moments: [],
  activeMoment: MomentEmpty,
  moment: MomentEmpty,
  activeMomentMedia: MomentMediaEmpty,
  momentMedia: MomentMediaEmpty,
  editingId: '',
  showOptions: false,
  loading: false,
  hasMore: false,
  isEditing: false,
  showMoment: false,
  isPlaying: true,
  userHasMoment: false,
  setForm: (key, value) =>
    set((state) => ({
      moment: {
        ...state.moment,
        [key]: value,
      },
    })),

  resetForm: () =>
    set({
      moment: MomentEmpty,
    }),

  setShowOptions: (state) => {
    set({
      showOptions: state,
    })
  },

  setIsPlaying: (state) => {
    set({
      isPlaying: state,
    })
  },
  setIsEditing: (state, id, index) => {
    set({
      isEditing: state,
      editingId: id,
      editingIndex: index,
    })
  },

  setShowMoment: (state) => {
    set({
      showMoment: state,
    })
  },

  changeActiveMomentMedia: (index, int) => {
    set((prev) => {
      return {
        activeMomentMediaIndex: index,
        activeMomentMedia: prev.moments[int].media[index],
      }
    })
  },

  openMomentModal: (index) => {
    set((prev) => {
      return {
        activeMoment: prev.moments[index],
        activeMomentMedia: prev.moments[index].media[0],
        activeMomentIndex: index,
        activeMomentMediaIndex: 0,
      }
    })
  },

  clearMoment: () => {
    set({
      activeMoment: MomentEmpty,
      activeMomentMedia: MomentMediaEmpty,
      activeMomentIndex: 0,
      activeMomentMediaIndex: 0,
    })
  },

  setProcessedResults: ({ count, results }: FetchMomentResponse) => {
    set({
      loading: false,
      count,
      moments: results,
    })
  },

  getMoments: async (url, setMessage) => {
    try {
      const response = await apiRequest<FetchMomentResponse>(url, {
        setMessage,
      })
      const data = response?.data
      if (data) {
        MomentStore.getState().setProcessedResults(data)
      }
    } catch (error: unknown) {
      console.log(error)
    }
  },

  postItem: async (url, updatedItem, setMessage) => {
    set({ loading: true })
    const response = await apiRequest<FetchMomentResponse>(url, {
      method: 'POST',
      body: updatedItem,
      setMessage,
    })
    const data = response?.data
    if (data) {
      MomentStore.getState().setProcessedResults(data)
    }
  },

  deleteMoment: async (url, setMessage) => {
    set({ loading: true })
    const response = await apiRequest<FetchMomentResponse>(url, {
      method: 'DELETE',
      setMessage,
    })
    const data = response?.data
    if (data) {
      MomentStore.getState().clearMoment()

      MomentStore.setState((prev) => {
        const updatedMoments = prev.moments
          .map((item) => {
            if (item._id === data.id) {
              return data.moment ? data.moment : null
            }
            return item
          })
          .filter((item) => item !== null)

        return {
          moments: updatedMoments as typeof prev.moments,
          showOptions: false,
          isPlaying: true,
        }
      })
    }
  },
}))
