import { useCallback, useEffect, useReducer } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from './appContext'
import { appReducer, ActionType } from './appReducer'
import { ApiErrorCode, ApiException, AppApi } from '../appApi'
import { IAppState, IPopupOptions } from '../../model'

// const WS_URL: string = process.env.REACT_APP_WS_URL || 'ws://localhost:8080'

const nullState: IAppState = {
  loading: false,
  popups: [],
  countries: [],
  languages: [],
  channels: [],
}

function createInitialState(baseState: IAppState): IAppState {
  return { ...baseState, token: localStorage.getItem('token') || undefined }
}

const AppState = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate()
  const [state, dispatch] = useReducer(appReducer, nullState, createInitialState)
  // const [ws, setWs] = useState<WebSocket | null>()

  // useEffect(() => {
  //   const socket = new WebSocket(WS_URL)
  //   socket.onopen = () => {
  //     console.log('WebSocket connection established!')
  //     if (state.token) socket.send(JSON.stringify({ type: 'auth.token', value: state.token }))
  //   }
  //   socket.onmessage = (event: MessageEvent) => {
  //     console.log('Got evenet', event)
  //     const msg = JSON.parse(event.data)
  //     if (!msg.type) {
  //       addPopup({ type: 'error', title: 'WebSocket error', text: 'no message type' })
  //       return
  //     }
  //     switch (msg.type) {
  //       case 'auth.state':
  //         const query_params = {
  //           response_type: 'code', // token
  //           client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
  //           redirect_uri: 'http://localhost:3000',
  //           scope: 'openid profile', // readonly  https://www.googleapis.com/auth/userinfo.profile
  //           state: msg.value,
  //         }
  //         console.log(query_params)
  //         const new_params = new URLSearchParams([...Object.entries(query_params)])
  //         window.location.href = `${process.env.REACT_APP_GOOGLE_AUTH_URI}?${new_params}`
  //         // window.location.replace(`https://accounts.google.com/o/oauth2/v2/auth?${new_params}`)
  //         break
  //       default:
  //         addPopup({ type: 'error', title: 'WebSocket error', text: `unknown message type: ${msg.type}` })
  //     }
  //   }
  //   socket.onclose = (event: CloseEvent) => {
  //     console.log(`WS closed code:${event.code} reason:${event.reason} clean:${event.wasClean}`)
  //   }
  //   setWs(socket)
  //   return () => {
  //     console.log('WebSocket connection STOP!')
  //     socket.close(3333, 'Close router')
  //     setWs(null)
  //   }
  //   // eslint-disable-next-line
  // }, [])

  // useEffect(() => {
  //   if (ws) console.log('READY STATE', ws.readyState)
  //   else console.log('NO WS')

  //   if (ws && ws.readyState === 1 && state.token) {
  //     console.log('WS AUTH')
  //     ws.send(JSON.stringify({ type: 'auth.token', value: state.token }))
  //   }
  // }, [ws, state.token])

  const addPopup = (msg: IPopupOptions) => dispatch({ type: ActionType.POPUP_ADD, payload: msg })
  const delPopup = (id: number) => dispatch({ type: ActionType.POPUP_DELETE, payload: id })
  const loading = (loadState: boolean) => dispatch({ type: ActionType.USER_LOADING, payload: loadState })

  // DICTS
  const countriesGet = useCallback(async () => {
    await AppApi.get('country', undefined)
      .then((response) => {
        dispatch({ type: ActionType.COUNTRIES_LIST, payload: response })
      })
      .catch((err: ApiException) => {
        addPopup({ type: 'error', title: 'Server error', text: `failed to get countries - ${err.message}` })
      })
  }, [])

  const languagesGet = useCallback(async () => {
    await AppApi.get('language', undefined)
      .then((response) => {
        dispatch({ type: ActionType.LANGUAGES_LIST, payload: response })
      })
      .catch((err: ApiException) => {
        addPopup({ type: 'error', title: 'Server error', text: `failed to get languages - ${err.message}` })
      })
  }, [])

  // AUTH
  const authNetwork = async (network: string): Promise<void> => {
    AppApi.get('auth', { network })
      .then((response) => {
        const searchParams: Record<string, any> = new URLSearchParams()
        searchParams.append('response_type', 'code') // token
        searchParams.append('client_id', process.env.REACT_APP_GOOGLE_CLIENT_ID)
        searchParams.append('redirect_uri', window.location.origin)
        searchParams.append('theme', 'dark')
        searchParams.append('scope', 'openid profile email')
        // openid https://www.googleapis.com/auth/profile.language.read https://www.googleapis.com/auth/user.gender.read https://www.googleapis.com/auth/user.birthday.read
        searchParams.append('state', response.nonce)
        const redirectUrl = new URL(`${process.env.REACT_APP_GOOGLE_AUTH_URI}`)
        redirectUrl.search = searchParams.toString()
        window.location.href = redirectUrl.toString()
      })
      .catch((_) => {
        addPopup({ type: 'error', title: 'Auth error', text: 'failed to get OAuth code' })
      })
  }

  const authCode = async (state: string, code: string): Promise<void> => {
    navigate(window.location.pathname, { replace: true })
    loading(true)
    await AppApi.post('auth', { nonce: state, code })
      .then((response) => {
        localStorage.setItem('token', response.token)
        dispatch({ type: ActionType.USER_TOKEN, payload: response.token })
      })
      .catch((_) => {
        addPopup({ type: 'error', title: 'Server error', text: 'failed to get token' })
        loading(false)
      })
  }

  const authLogout = (): void => {
    AppApi.delete('auth', state.token).catch((_) => {
      addPopup({ type: 'error', title: 'Server error', text: 'failed to logout' })
    })
    localStorage.removeItem('token')
    dispatch({ type: ActionType.USER_LOGOUT })
    navigate('/', { replace: true }) // TODO: change url ?
  }

  // USER
  const userGet = useCallback(async () => {
    await AppApi.get('user', undefined, state.token)
      .then((response) => {
        dispatch({ type: ActionType.USER_SET, payload: response })
      })
      .catch((err: ApiException) => {
        if (err.code === ApiErrorCode.FORBIDDEN) localStorage.removeItem('token')
        addPopup({ type: 'error', title: 'Server error', text: `failed to get user - ${err.message}` })
      })
    loading(false)
  }, [state.token])

  // userUpdate

  // CHANNEL
  const channelsGet = (): void => {
    AppApi.get('channel', undefined, state.token)
      .then((response) => {
        dispatch({ type: ActionType.CHANNEL_LIST, payload: response })
      })
      .catch((_) => {
        addPopup({ type: 'error', title: 'Server error', text: 'failed to get channels' })
      })
  }

  useEffect(() => {
    countriesGet()
    languagesGet()
  }, [countriesGet, languagesGet])

  useEffect(() => {
    if (state.token) userGet()
  }, [state.token, userGet])

  return (
    <AppContext.Provider
      value={{
        loading: state.loading,
        popups: state.popups,
        countries: state.countries,
        languages: state.languages,
        channels: state.channels,
        token: state.token,
        user: state.user,
        addPopup,
        delPopup,
        authNetwork,
        authCode,
        authLogout,
        channelsGet,
      }}>
      {children}
    </AppContext.Provider>
  )
}
export default AppState
