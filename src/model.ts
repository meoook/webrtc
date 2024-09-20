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

export interface ICountry {
  code: string
  name: string
}

export interface ILanguage {
  code: string
  name: string
}

export interface IApiUser {
  username: string
  email: string
  avatar: string
  balance: string
  banned_till: string | null
  country: string | null
  language: string | null
  telegram_id: string
  channel: string | null
}

export interface IApiChannel {
  id: number
  owner: string
  avatar: string
  tags: string[]
  subscribers: number
  viewers: number
  name: string
  title: string
  description: string
  image: string | null
  is_online: boolean
  is_censored: boolean
  start_in: string | null
}

export type WebRTCUser = {
  id: string
  email: string
  stream: MediaStream
}

export interface IAppState {
  loading: boolean
  popups: IPopup[]
  countries: ICountry[]
  languages: ILanguage[]
  channels: IApiChannel[]
  token?: string
  user?: IApiUser
}

export interface IAppContext extends IAppState {
  addPopup: (popup: IPopupOptions) => void
  delPopup: (id: number) => void
  authNetwork: (network: string) => Promise<void>
  authCode: (state: string, code: string) => Promise<void>
  authLogout: () => void
  channelsGet: () => void
}
