import { useReducer } from 'react'
import AppContext from './appContext'
import { appReducer } from './appReducer'
import {
  POPUP_MESSAGE_ADD,
  POPUP_MESSAGE_DELETE,
  USER_LOADING,
  USER_TOKEN,
  USER_LOGOUT,
  USER_SET,
} from '../actionTypes'

import { nullState, connectErrMsg, AppApi } from '../utils'
import { IAppState, IPopupOptions, IUserCredentials } from '../../model'

const WS_URL: string = process.env.REACT_APP_WS_URL || 'ws://localhost:8080'

function createInitialState(baseState: IAppState): IAppState {
  return { ...baseState, token: localStorage.getItem('token') || undefined }
}

const AppState = ({ children }: { children: React.ReactNode }) => {
  // const token = localStorage.getItem('token')
  const [state, dispatch] = useReducer(appReducer, nullState, createInitialState)

  const config = () => ({ headers: { 'Content-Type': 'application/json', Authorization: `Token ${state.token}` } })

  const addPopup = (msg: IPopupOptions) => dispatch({ type: POPUP_MESSAGE_ADD, payload: msg })
  const delPopup = (id: number) => dispatch({ type: POPUP_MESSAGE_DELETE, payload: id })
  const loading = (loadState: boolean = true) => dispatch({ type: USER_LOADING, payload: loadState })

  const api = new AppApi(state.token)

  // ACCOUNT
  const userLogin = async (credentials: IUserCredentials): Promise<boolean> => {
    loading()
    let status = false
    api
      .post('auth/login', credentials)
      .then((response) => {
        localStorage.setItem('token', response.token)
        status = true
        dispatch({ type: USER_TOKEN, payload: response.token })
      })
      .catch((err: any) => {
        addPopup({ title: 'Request error', text: 'Failed to connect', type: 'error', nofade: true })
        loading(false)
      })
    return status
  }

  const userGet = async (): Promise<void> => {
    loading()
    api
      .get('auth/user')
      .then((response) => {
        dispatch({ type: USER_SET, payload: response })
      })
      .catch((err: any) => {
        dispatch({ type: USER_LOGOUT })
        addPopup(connectErrMsg(err, 'Login or passowrd incorrect'))
      })
    loading(false)
  }

  const userLogout = async (): Promise<void> => {
    localStorage.removeItem('token')
    await api.delete('auth/logout').catch((err: any) => {
      addPopup(connectErrMsg(err, 'Request error'))
    })
    dispatch({ type: USER_LOGOUT })
  }

  return (
    <AppContext.Provider
      value={{
        popups: state.popups,
        loading: state.loading,
        token: state.token,
        user: state.user,
        addPopup,
        delPopup,
        userLogin,
        userGet,
        userLogout,
      }}>
      {children}
    </AppContext.Provider>
  )
}
export default AppState
