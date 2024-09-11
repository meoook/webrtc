import { IAppState, IPopup } from '../model'

// CONSTANTS
export const nullState: IAppState = {
  popups: [],
  loading: false,
  channels: [],
}

// FUNCTIONS
export const getNextId = (arr: IPopup[]) => {
  if (arr.length === 0) return 0
  else return arr[arr.length - 1].id + 1
}

export enum ApiErrorCode {
  CONNECTION_ERROR = 0,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
}

export class ApiException extends Error {
  public code: ApiErrorCode = ApiErrorCode.FORBIDDEN
  public message: string = 'connection error'

  constructor(code?: ApiErrorCode, data?: Record<string, any>) {
    super()
    if (code) this.code = code
    if (data && data.detail) this.message = data.detail
    else if (data) this.message = JSON.stringify(data)
  }

  public toString = (): string => `API Error code: ${this.code} ${this.message}`
}

export class AppApi {
  static API_URL: string = process.env.REACT_APP_API_URL || 'http://localhost:8000'

  static #headers(token?: string): Record<string, string> {
    if (!token) return { 'Content-Type': 'application/json' }
    return { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }
  }

  static get = async (path: string, params?: Record<string, any>, token?: string): Promise<any> => {
    const query = new URLSearchParams(params).toString()
    const _path = query ? `${path}?${query}` : path
    const options = { method: 'GET', headers: AppApi.#headers(token) }
    return await AppApi.#request(_path, options)
  }

  static post = async (path: string, data: Record<string, any>, token?: string): Promise<any> => {
    const options = { method: 'POST', headers: AppApi.#headers(token), body: JSON.stringify(data) }
    return await AppApi.#request(path, options)
  }

  static delete = async (path: string, token?: string): Promise<any> => {
    const options = { method: 'DELETE', headers: AppApi.#headers(token) }
    return await AppApi.#request(path, options)
  }

  static #request = async (path: string, options: Record<string, any>) => {
    let response: Response
    try {
      response = await fetch(`${AppApi.API_URL}/${path}`, options)
      if (response.ok) return await AppApi.#handle(response)
    } catch (_) {
      throw new ApiException()
    }
    try {
      const data: Record<string, any> = await response.json()
      throw new ApiException(response.status, data)
    } catch (_) {
      throw new ApiException(response.status)
    }
  }

  static #handle = async (response: Response): Promise<Record<string, any> | undefined> => {
    try {
      return await response.json()
    } catch {
      return
    }
  }
}
