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

export interface IApiUser {
  address: string
  email: string
  email_validated: boolean
  telegram_id: string
  locked: number
  account: IAccount
}

export interface ITimeFrame {
  timeframe: string
  name: string
}

export interface IPair {
  coin_base: string
  coin_quote: string
  symbol: string
  leverage: number
}

export interface IAccountUpdate {
  id: number
  api_key: string
  api_secret: string
}

export interface IAccount {
  id: number
  error: string
  trade: boolean
  loan: boolean
}

export interface IBotIndicator {
  work: number
  circles: number
  circle: number
  base: number
  quote: number
  base_borrowed: number
  quote_borrowed: number
  liquidation: number
  balance: number
  // All time calculation
  buy_qty: number
  buy_avg: number
  sell_qty: number
  sell_avg: number
  fee: number
  result: number
  bot_fee: number
}

export interface IBotCreate {
  account: number
  pair: string
  timeframe: string
  name: string
}

export interface IBotChange {
  timeframe: string
  name: string
  active: boolean
  next_month: boolean
  balance_limit: number
  circles_limit: number
  orders_limit: number
  delta: number
  // balance_stop: 0
  // balance_out: 0
}

export interface IBot extends IBotChange {
  id: number
  account: number
  pair: string
  error: string
  warning: string
  indicator?: IBotIndicator
}

export interface IBotStats {
  id: number
  bot: number
  month: string
  buy: number
  buy_qty: number
  buy_avg: number
  sell: number
  sell_qty: number
  sell_avg: number
  fee: number
  result: number
  profit: number
  bot_fee: number
}

export interface IBotTrade {
  id: number
  side: string
  quantity: number
  price: number
  fee: number
  time: number
}

export interface Web3Message {
  address: string
  nonce: string
  domain: string
  statement: string
  uri: string
  chainId: number
  timeout: number
}

export interface ITotal {
  bots: number
  buy: number
  sell: number
  profit: number
  result: number
  bot_fee: number
}

export interface IInfo extends ITotal {
  month: string
}

export interface Web3Message {
  address: string
  nonce: string
  domain: string
  statement: string
  uri: string
  chainId: number
  timeout: number
}
