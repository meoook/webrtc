import { IAppState, IPopup } from '../model'

// CONSTANTS
export const nullState: IAppState = {
  popups: [],
  loading: false,
}

// FUNCTIONS
export const getNextId = (arr: IPopup[]) => {
  if (arr.length === 0) return 0
  else return arr[arr.length - 1].id + 1
}
export const connectErrMsg = (err: any, msg: string, title?: string) => {
  if (!err.response) return { text: 'Сервер недоступен', type: 'warning' }
  console.warn('Err from UserState:', err.response.statusText) // TODO: Обработка ошибок - вывод err.response.data
  return { text: msg, type: 'warning', title }
}

interface ApiResponse {
  [key: string]: any
}

export class AppApi {
  #API_URL: string = process.env.REACT_APP_API_URL || 'http://localhost:3030'
  #token: string

  constructor(token?: string) {
    console.log(`Initialize APP API for ${this.#API_URL}`)
    this.#token = token || ''
  }

  set token(value: string) {
    this.#token = value
  }

  get #headers(): Record<string, string> {
    const headers = { 'Content-Type': 'application/json' }
    if (this.#token) return { ...headers, Authorization: `Bearer ${this.#token}` }
    return headers
  }

  get = async (path: string, params?: Record<string, any>): Promise<ApiResponse | ApiResponse[]> => {
    const query = new URLSearchParams(params).toString()
    const url = query ? `${this.#API_URL}/${path}?${query}` : `${this.#API_URL}/${path}`
    const options = { method: 'POST', headers: this.#headers }
    const response = await fetch(url, options)
    if (response.ok) return await response.json()
    throw new Error(`HTTP error! status: ${response.status}`)
  }

  post = async (path: string, data: Record<string, any>): Promise<any> => {
    const options = { method: 'POST', headers: this.#headers, body: JSON.stringify(data) }
    const response = await fetch(`${this.#API_URL}/${path}`, options)
    if (response.ok) return await response.json()
    throw new Error(`HTTP error! status: ${response.status}`)
  }

  delete = async (path: string): Promise<void> => {
    const options = { method: 'DELETE', headers: this.#headers }
    const response = await fetch(`${this.#API_URL}/${path}`, options)
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)
  }
}
