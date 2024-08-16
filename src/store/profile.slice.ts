import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IPopup, IPopupOptions } from '../model'

interface IProfileState {
  token: string | null
  loading: boolean
  messages: IPopup[]
}

const LOCAL_STORAGE_TOKEN_KEY: string = 'token'

const initialState: IProfileState = {
  token: localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY),
  loading: false,
  messages: [],
}

export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    },
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload
      localStorage.setItem(LOCAL_STORAGE_TOKEN_KEY, action.payload)
    },
    destroyToken: (state, action: PayloadAction<void>) => {
      state.token = null
      localStorage.removeItem(LOCAL_STORAGE_TOKEN_KEY)
    },
    addMessage: (state, action: PayloadAction<IPopupOptions>) => {
      const messageID: number = state.messages.length === 0 ? 0 : state.messages[state.messages.length - 1].id + 1
      state.messages.push({ id: messageID, ...action.payload })
    },
    removeMessage: (state, action: PayloadAction<number>) => {
      state.messages = state.messages.filter((message) => message.id !== action.payload)
    },
  },
})

export const profileReducer = profileSlice.reducer
export const { setLoading, setToken, destroyToken, addMessage, removeMessage } = profileSlice.actions
