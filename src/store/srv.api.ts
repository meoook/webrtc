import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { RootState } from './store'
import {
  ListResponse,
  ITimeFrame,
  IPair,
  IApiUser,
  IAccount,
  IBot,
  IBotChange,
  IBotStats,
  IBotTrade,
  IAccountUpdate,
  IBotCreate,
  IInfo,
  ITotal,
} from '../model'
import { setLoading, setToken, destroyToken } from './profile.slice'
import { Web3Message } from '../model'

export const srvApi = createApi({
  reducerPath: 'server/api',

  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_BACKEND_URL,
    prepareHeaders: (headers, api) => {
      const token = (api.getState() as RootState).profile.token
      if (token) headers.set('Authorization', `Bearer ${token}`)
      return headers
    },
  }),

  tagTypes: ['User', 'Account', 'Bot'],
  endpoints: (build) => ({
    w3nonce: build.mutation<Web3Message, { chain: number; address: string }>({
      query: ({ chain, address }) => ({
        url: 'auth/web3',
        params: { chain, address },
      }),
    }),
    w3auth: build.mutation<string, { message: string; signature: string }>({
      // invalidatesTags: ['User'],
      query: ({ message, signature }) => ({
        url: 'auth/web3',
        method: 'POST',
        body: { message, signature },
      }),
      transformResponse: (response: any) => response.token,
      transformErrorResponse: (response: any) => {
        if (response.status === 'FETCH_ERROR') return 'server unreacheble'
        return 'invalid signature'
      },
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        dispatch(setLoading(true))
        try {
          const { data: token } = await queryFulfilled
          dispatch(setToken(token))
        } catch (error) {
          dispatch(setLoading(false))
        }
      },
    }),
    signIn: build.mutation<string, { email: string; password: string }>({
      // invalidatesTags: ['User'],
      query: ({ email, password }) => ({
        url: 'auth/login/',
        method: 'POST',
        body: { username: email, password },
      }),
      transformResponse: (response: any) => response.token,
      transformErrorResponse: (response: any) => {
        if (response.status === 'FETCH_ERROR') return 'server unreacheble'
        return 'invalid credentials'
      },
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        dispatch(setLoading(true))
        try {
          const { data: token } = await queryFulfilled
          dispatch(setToken(token))
        } catch (error) {
          dispatch(setLoading(false))
        }
      },
    }),
    singOut: build.mutation<void, void>({
      invalidatesTags: ['User', 'Account', 'Bot'],
      query: () => ({
        url: 'auth/logout/',
        method: 'POST',
      }),
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled
          dispatch(destroyToken())
        } catch {}
      },
    }),
    getUser: build.query<IApiUser, void>({
      query: () => ({
        url: 'auth/user',
      }),
      providesTags: ['User'],
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data: user } = await queryFulfilled
          dispatch(srvApi.util.upsertQueryData('getAccount', user.account.id, user.account))
        } catch (error) {
          dispatch(destroyToken())
        }
        dispatch(setLoading(false))
      },
    }),
    telegramNonce: build.mutation<{ nonce: number; expire: number }, void>({
      query: () => 'auth/user/telegram',
    }),
    setPassword: build.mutation<void, string>({
      query: (password) => ({
        url: 'auth/user/password',
        method: 'POST',
        body: { password },
      }),
    }),
    setEmail: build.mutation<void, string>({
      // invalidatesTags: ['User'],
      query: (email) => ({
        url: 'auth/user/email',
        method: 'POST',
        body: { email },
      }),
      transformErrorResponse: (response: any) => {
        if (response.status === 'FETCH_ERROR') return 'server unreacheble'
        if (response.data.email) return response.data.email[0]
        return 'invalid email'
      },
      async onQueryStarted(email, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled
          dispatch(
            srvApi.util.updateQueryData('getUser', undefined, (draft) => {
              draft.email = email
            })
          )
        } catch {}
      },
    }),
    getPairs: build.query<IPair[], void>({
      query: () => 'pair',
    }),
    getTimeframes: build.query<ITimeFrame[], void>({
      query: () => 'timeframe',
      transformResponse: (response: Array<string[]>) => response.map((e) => ({ timeframe: e[0], name: e[1] })),
    }),
    getAccount: build.query<IAccount, number | undefined>({
      providesTags: ['Account'],
      query: (id) => `account/${id}`,
    }),
    updateAccount: build.mutation<IAccount, IAccountUpdate>({
      query: (account) => ({
        url: `account/${account.id}/`,
        method: 'PUT',
        body: account,
      }),
    }),
    getBots: build.query<IBot[], void>({
      providesTags: ['Bot'],
      query: () => 'bot',
    }),
    createBot: build.mutation<IBot, IBotCreate>({
      query: ({ account, pair, timeframe, name }) => ({
        url: 'bot/',
        method: 'POST',
        body: { account, pair, timeframe, name },
      }),
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        try {
          const { data: createdBot } = await queryFulfilled
          dispatch(
            srvApi.util.updateQueryData('getBots', undefined, (draft) => {
              draft.push(createdBot)
            })
          )
        } catch {}
      },
    }),
    updateBot: build.mutation<IBot, { botID: number; changes: IBotChange }>({
      invalidatesTags: ['Bot'],
      query: ({ botID, changes }) => ({
        url: `bot/${botID}/`,
        method: 'PUT',
        body: changes,
      }),
    }),
    deleteBot: build.mutation<IBot, number>({
      query: (botID) => ({
        url: `bot/${botID}`,
        method: 'DELETE',
      }),
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled
          dispatch(
            srvApi.util.updateQueryData('getBots', undefined, (draft) => {
              const indexToRemove = draft.findIndex((b) => b.id === id)
              if (indexToRemove !== -1) {
                draft.splice(indexToRemove, 1)
              }
            })
          )
        } catch {}
      },
    }),
    getStats: build.query<ListResponse<IBotStats>, string>({
      query: (pair: string) => ({
        url: 'stats',
        params: { pair, limit: 10 },
      }),
    }),
    getTrades: build.query<ListResponse<IBotTrade>, string>({
      query: (pair: string) => ({
        url: 'trade',
        params: { pair, limit: 10 },
      }),
    }),
    getInfo: build.query<IInfo, void>({
      query: () => 'info',
    }),
    getTotal: build.query<ITotal, void>({
      query: () => 'info/total',
    }),
  }),
})

export const {
  useW3nonceMutation,
  useW3authMutation,
  useSignInMutation,
  useSingOutMutation,
  useGetUserQuery,
  useTelegramNonceMutation,
  useSetPasswordMutation,
  useSetEmailMutation,
  useGetPairsQuery,
  useGetTimeframesQuery,
  useGetAccountQuery,
  useLazyGetAccountQuery,
  useUpdateAccountMutation,
  useGetBotsQuery,
  useCreateBotMutation,
  useUpdateBotMutation,
  useDeleteBotMutation,
  useGetStatsQuery,
  useGetTradesQuery,
  useGetInfoQuery,
  useGetTotalQuery,
} = srvApi
