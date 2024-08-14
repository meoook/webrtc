import style from './account.module.scss'
import { useState } from 'react'
import { IAccount, IAccountUpdate } from '../../model'
import { useLazyGetAccountQuery, useUpdateAccountMutation } from '../../store/srv.api'
import Notify from '../notify'
import Valid from '../valid'
import iconArray from '../../elements/ico-get/icons'
import InputTextField from '../../elements/input-field'

interface AccountProps {
  children?: React.ReactNode
  account: IAccount
}

export default function Account({ account }: AccountProps) {
  const [edit, setEdit] = useState<boolean>(!account.trade)

  const toggle = () => {
    setEdit((prev) => !prev)
  }

  return (
    <>
      <div className='row justify center'>
        <h1>Exchange account</h1>
        <button className={edit ? style.hide : style.show} onClick={toggle}>
          <span>{edit ? 'hide' : 'change'}</span>
          {iconArray.arr_down}
        </button>
      </div>
      <div className={style.content}>
        <DisplaAccount account={account} />
        <UpdateAccount account={account} hidden={!edit} />
      </div>
    </>
  )
}

function DisplaAccount({ account }: { account: IAccount }) {
  const loading: boolean = !account.trade && !account.error
  return (
    <>
      {account.error && <Notify type='error'>{account.error}</Notify>}
      <div className='row justify center'>
        <div className={style.permissions}>
          <span>verified:</span>
          <Valid valid={loading ? undefined : !account.error} />
        </div>
        <div className={style.permissions}>
          <span>trade:</span>
          <Valid valid={account.trade} />
        </div>
        <div className={style.permissions}>
          <span>loan:</span>
          <Valid valid={account.loan} />
        </div>
      </div>
    </>
  )
}

function UpdateAccount({ account, hidden }: { account: IAccount; hidden: boolean }) {
  const [updateAccount] = useUpdateAccountMutation()
  const [fetchAccount] = useLazyGetAccountQuery()
  const [credentials, setCredentials] = useState<IAccountUpdate>({ id: account.id, api_key: '', api_secret: '' })

  const onChange = (name: string, value: string) => {
    setCredentials({ ...credentials, [name]: value.trim() })
  }

  const handleSubmit = () => {
    if (!credentials.api_key.trim() || !credentials.api_secret.trim()) return
    updateAccount(credentials)
    setTimeout(() => {
      fetchAccount(account.id)
    }, 5000)
  }

  const elemStyle = hidden ? `${style.normal} ${style.hidden}` : `${style.normal}`
  return (
    <div className={elemStyle}>
      <InputTextField
        name='api_key'
        onChange={onChange}
        value={credentials.api_key}
        // icon='key'
        title='Api key'
        ph='Enter your api key'
        outColor='brand'
        helpText='Get api key in binance application'
      />
      <InputTextField
        name='api_secret'
        onChange={onChange}
        value={credentials.api_secret}
        // icon='key'
        title='Api secret'
        ph='Enter your api secret'
        outColor='brand'
        helpText='Get api secret in binance application'
      />
      <button className='btn green' onClick={handleSubmit} disabled={!credentials.api_key || !credentials.api_secret}>
        Save
      </button>
    </div>
  )
}
