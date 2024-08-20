import { IAppState } from '../../model'
import {
  POPUP_MESSAGE_ADD,
  POPUP_MESSAGE_DELETE,
  USER_LOADING,
  USER_TOKEN,
  USER_SET,
  USER_LOGOUT,
} from '../actionTypes'

import { getNextId, nullState } from '../utils'

interface IAction {
  type: string
  payload?: any
}
type HandlerFunction = (state: IAppState, action: IAction) => IAppState

const handlers: Record<string, HandlerFunction> = {
  [POPUP_MESSAGE_ADD]: (state: IAppState, { payload }: IAction): IAppState => ({
    ...state,
    popups: [...state.popups, { id: getNextId(state.popups), ...payload }],
  }),
  [POPUP_MESSAGE_DELETE]: (state: IAppState, { payload }: IAction): IAppState => ({
    ...state,
    popups: state.popups.filter((popups) => popups.id !== payload),
  }),
  [USER_LOADING]: (state: IAppState, { payload }: IAction): IAppState => ({ ...state, loading: payload }),
  [USER_TOKEN]: (state: IAppState, { payload }: IAction): IAppState => ({ ...state, token: payload }),
  [USER_SET]: (state: IAppState, { payload }: IAction): IAppState => ({ ...state, user: payload }),
  [USER_LOGOUT]: (state: IAppState): IAppState => ({ ...nullState }),
  DEFAULT: (state: IAppState): IAppState => state,
}

export const appReducer = (state: IAppState, action: IAction) => {
  const handler = handlers[action.type] || handlers.DEFAULT
  return handler(state, action)
}
