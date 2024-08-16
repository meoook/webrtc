import { configureStore } from '@reduxjs/toolkit'
import { srvApi } from './srv.api'
import { profileReducer } from './profile.slice'

const store = configureStore({
  reducer: {
    profile: profileReducer,
    [srvApi.reducerPath]: srvApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(srvApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
