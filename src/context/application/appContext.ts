import { createContext } from 'react'
import { IAppContext } from '../../model'

const AppContext = createContext<IAppContext>({
  popups: [],
  loading: false,
  addPopup: () => {},
  delPopup: () => {},
  userLogin: async () => false,
  userGet: async () => {},
  userLogout: async () => {},
})

export default AppContext
