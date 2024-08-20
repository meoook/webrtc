export interface IPopupOptions {
  type: string // 'default' | 'success' | 'info' | 'warning' | 'error'
  text: string
  title?: string
  nofade?: boolean
}

export interface IPopup extends IPopupOptions {
  id: number
}

export interface ListResponse<T> {
  total: number
  data: T[]
}

export interface IUserCredentials {
  username: string
  password: string
}

export interface IApiUser {
  username: string
  email: string
  channel: string
}

export type WebRTCUser = {
  id: string
  email: string
  stream: MediaStream
}

export interface IAppState {
  popups: IPopup[]
  loading: boolean
  token?: string
  user?: IApiUser
}

export interface IAppContext extends IAppState {
  addPopup: (popup: IPopupOptions) => void
  delPopup: (id: number) => void
  userLogin: (credentials: IUserCredentials) => Promise<boolean>
  userGet: () => Promise<void>
  userLogout: () => Promise<void>
}
