import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

import Web3 from 'web3'
import { Web3Message } from '../model'
import { BOT_PAY_ABI, BOT_PAY_ADDRESS } from './botPay'
import { LTR_ABI, LTR_ADDRESS } from './ltr'
import imgToken from '../svg/token.png'

export const VALID_CHAIN_ID: number = 97

declare global {
  interface Window {
    ethereum: any
  }
}

const web3 = new Web3(window.ethereum)
const w3BotPayContract = new web3.eth.Contract(BOT_PAY_ABI, BOT_PAY_ADDRESS)
const w3TokenContract = new web3.eth.Contract(LTR_ABI, LTR_ADDRESS)

// const provider = window.ethereum
// provider.on('accountsChanged', () => {  // Locked or changed account
//   console.log('Provider accountsChanged')
// })
// provider.on('chainChanged', () => {  // chain changed
//   console.log('Provider chainChanged')
//   window.location.reload()
// })

// // Remove individual listeners
// provider.removeListener('connect', updateWalletAndAccounts)
// provider.removeListener('accountsChanged', updateWallet)

// provider.on('_initialized', updateWalletAndAccounts)
// provider.on('connect', updateWalletAndAccounts)
// provider.on('accountsChanged', updateWallet)
// provider.on('chainChanged', updateWalletAndAccounts)
// provider.on('disconnect', disconnectWallet)

// // Remove individual listeners
// provider.removeListener('connect', updateWalletAndAccounts)
// provider.removeListener('accountsChanged', updateWallet)

interface IW3WalletState {
  connected: boolean
  address: string | null
  chain: number | null
}

interface IW3UserBalance {
  symbol: string | null
  allowence: string
  balance: string
  free: string
  locked: string
  perBot: string
}

interface IW3State extends IW3WalletState {
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  symbol: string | null
  allowence: number
  balance: number
  free: number
  locked: number
  perBot: number
}

const initialState: IW3State = {
  connected: false,
  address: null,
  chain: null,
  symbol: null,
  allowence: 0,
  balance: 0,
  free: 0,
  locked: 0,
  perBot: 0,
  status: 'idle',
}

export const setNetwork = createAsyncThunk('w3/setNetwork', async () => {
  const currentNetwork = await web3.eth.getChainId()
  if (Number(currentNetwork) === VALID_CHAIN_ID) return VALID_CHAIN_ID

  try {
    await window.ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: web3.utils.toHex(VALID_CHAIN_ID) }],
    })
    return VALID_CHAIN_ID
  } catch (err: any) {
    // https://docs.metamask.io/wallet/reference/wallet_addethereumchain/
    if (err.code === 4902) {
      await window.ethereum.request({
        method: 'wallet_addEthereumChain',
        params: [
          // {
          //   chainName: 'Polygon Mainnet',
          //   chainId: web3.utils.toHex(chainId), // 137
          //   nativeCurrency: { name: 'MATIC', decimals: 18, symbol: 'MATIC' },
          //   rpcUrls: ['https://polygon-rpc.com/'],
          // },
          {
            chainName: 'BSC Testnet',
            chainId: web3.utils.toHex(VALID_CHAIN_ID), // 97
            nativeCurrency: { name: 'BNB', decimals: 18, symbol: 'BNB' },
            rpcUrls: ['https://data-seed-prebsc-1-s1.binance.org:8545/'],
            blockExplorerUrls: ['https://testnet.bscscan.com'],
          },
          // {
          //   chainName: 'Binance Smart Chain',
          //   chainId: web3.utils.toHex(chainId), // 56
          //   nativeCurrency: { name: 'BNB', decimals: 18, symbol: 'BNB' },
          //   rpcUrls: ['https://bsc-dataseed.binance.org/'],
          //   blockExplorerUrls: ['https://bscscan.com'],
          // },
        ],
      })
      return VALID_CHAIN_ID
    }
  }
  return Number(currentNetwork)
})

export const addToken = async (): Promise<void> => {
  const tokenSymbol = 'LTR'
  const tokenDecimals = 18
  const { origin } = window.location
  const tokenImage1 = `${origin}${imgToken}`

  try {
    await window.ethereum // Or window.ethereum if you don't support EIP-6963.
      .request({
        method: 'wallet_watchAsset',
        params: {
          type: 'ERC20',
          options: {
            address: LTR_ADDRESS,
            symbol: tokenSymbol,
            decimals: tokenDecimals,
            image: tokenImage1,
          },
        },
      })
  } catch (err) {}
}

export const getAddress = createAsyncThunk('w3/getAddress', async () => {
  const state: IW3WalletState = {
    connected: false,
    address: null,
    chain: null,
  }
  if (!window.ethereum || !web3) return state
  state.connected = window.ethereum.isConnected()
  const chain = await web3.eth.getChainId()
  state.chain = Number(chain)
  await window.ethereum.request({ method: 'eth_requestAccounts' })
  const accounts = await web3.eth.getAccounts()
  state.address = accounts[0]
  return state
})

export const getBalance = createAsyncThunk('w3/getBalance', async (address: string) => {
  const allowed = await w3TokenContract.methods.allowance(address, BOT_PAY_ADDRESS).call()
  const balance = await w3TokenContract.methods.balanceOf(address).call()
  const { 0: free, 1: locked } = await w3BotPayContract.methods.getBalance(address).call<bigint[]>()
  const minLock = await w3BotPayContract.methods.minLock().call<bigint>()
  const userBalance: IW3UserBalance = {
    symbol: await w3TokenContract.methods.symbol().call(),
    allowence: web3.utils.fromWei(allowed, 'ether'),
    balance: web3.utils.fromWei(balance, 'ether'),
    free: web3.utils.fromWei(free, 'ether'),
    locked: web3.utils.fromWei(locked, 'ether'),
    perBot: web3.utils.fromWei(minLock, 'ether'),
  }
  return userBalance
})

export const handleSignMessage = createAsyncThunk(
  'w3/signMessage',
  async ({ address, nonce, domain, statement, uri, chainId, timeout }: Web3Message, { rejectWithValue }) => {
    try {
      const message: string = `${domain} wants you to sign in with your\nEthereum account: ${address}\n\n${statement}\n\nURI: ${uri}\nChain ID: ${chainId}\nNonce: ${nonce}\nTimeout: ${timeout}`
      const signature: string = await web3.eth.personal.sign(message, address, '')
      return { message, signature }
    } catch (err) {
      return rejectWithValue('You need to sign the message to be able to log in')
    }
  }
)

export const addAllowence = async (address: string, amount: number): Promise<void> => {
  const wei: string = web3.utils.toWei(amount, 'ether')
  try {
    await w3TokenContract.methods.approve(BOT_PAY_ADDRESS, wei).send({ from: address })
  } catch (err: any) {
    if (err.code === 100) console.log('User denied transaction signature')
  }
}

export const w3AddLocked = async (address: string, amount: number): Promise<void> => {
  const wei: string = web3.utils.toWei(amount, 'ether')
  try {
    await w3BotPayContract.methods.addLocked(wei).send({ from: address })
  } catch (err: any) {
    // TODO: dispatch error
    if (err.code === 100) console.log('User denied transaction signature')
  }
}

export const w3LockFree = async (address: string, amount: number): Promise<void> => {
  const wei: string = web3.utils.toWei(amount, 'ether')
  try {
    await w3BotPayContract.methods.lockFree(wei).send({ from: address })
  } catch (err: any) {
    if (err.code === 100) console.log('User denied transaction signature')
  }
}

export const w3Slice = createSlice({
  name: 'w3',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAddress.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(getAddress.fulfilled, (state, action: PayloadAction<IW3WalletState>) => {
        state.status = 'idle'
        state.connected = action.payload.connected
        state.address = action.payload.address
        state.chain = action.payload.chain
      })
      .addCase(getAddress.rejected, (state) => {
        state.status = 'failed'
      })
      .addCase(getBalance.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(getBalance.fulfilled, (state, action: PayloadAction<IW3UserBalance>) => {
        state.status = 'idle'
        state.symbol = action.payload.symbol
        state.balance = Number(action.payload.balance)
        state.allowence = Number(action.payload.allowence)
        state.free = Number(action.payload.free)
        state.locked = Number(action.payload.locked)
        state.perBot = Number(action.payload.perBot)
      })
      .addCase(getBalance.rejected, (state) => {
        state.status = 'failed'
      })
      .addCase(setNetwork.fulfilled, (state, action: PayloadAction<number>) => {
        state.chain = action.payload
      })
  },
})

export const w3Reducer = w3Slice.reducer
