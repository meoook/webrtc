import { IAppState } from '../../model'

import { getNextId } from '../utils'

export enum ActionType {
  DEFAULT = 'DEFAULT',
  POPUP_ADD = 'POPUP_ADD',
  POPUP_DELETE = 'POPUP_DELETE',
  USER_LOADING = 'USER_LOADING',
  USER_TOKEN = 'USER_TOKEN',
  USER_SET = 'USER_SET',
  USER_LOGOUT = 'USER_LOGOUT',
  CHANNEL_LIST = 'CHANNEL_LIST',
}

interface IAction {
  type: ActionType
  payload?: any
}
type HandlerFunction = (state: IAppState, action: IAction) => IAppState

const handlers: Record<ActionType, HandlerFunction> = {
  [ActionType.POPUP_ADD]: (state: IAppState, { payload }: IAction): IAppState => ({
    ...state,
    popups: [...state.popups, { id: getNextId(state.popups), ...payload }],
  }),
  [ActionType.POPUP_DELETE]: (state: IAppState, { payload }: IAction): IAppState => ({
    ...state,
    popups: state.popups.filter((popups) => popups.id !== payload),
  }),
  [ActionType.USER_LOADING]: (state: IAppState, { payload }: IAction): IAppState => ({ ...state, loading: payload }),
  [ActionType.USER_TOKEN]: (state: IAppState, { payload }: IAction): IAppState => ({ ...state, token: payload }),
  [ActionType.USER_SET]: (state: IAppState, { payload }: IAction): IAppState => ({ ...state, user: payload }),
  [ActionType.USER_LOGOUT]: (state: IAppState): IAppState => ({ ...state, user: undefined, token: undefined }),
  [ActionType.CHANNEL_LIST]: (state: IAppState, { payload }: IAction): IAppState => ({ ...state, channels: payload }),
  DEFAULT: (state: IAppState): IAppState => state,
}

export const appReducer = (state: IAppState, action: IAction) => {
  const handler = handlers[action.type] || handlers.DEFAULT
  return handler(state, action)
}
