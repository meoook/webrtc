import { createContext } from 'react'
import { IAppContext } from '../../model'

export const AppContext = createContext<IAppContext>({
  loading: false,
  popups: [],
  countries: [],
  languages: [],
  channels: [],
  addPopup: () => {},
  delPopup: () => {},
  authNetwork: async () => {},
  authCode: async () => {},
  authLogout: () => {},
  channelsGet: () => {},
})
