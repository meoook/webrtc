import { useState } from 'react'
import { useAppDispatch } from '../store/hooks'
import { useSignInMutation, useW3nonceMutation, useW3authMutation } from '../store/srv.api'
import InputTextField from '../elements/input-field'

export default function PageLogin() {
  const [auth, setAuth] = useState({ name: '' })
  const [disabled, setDisabled] = useState(false)
  const [fetchSignIn, { isLoading, isError, error }] = useSignInMutation()

  const handleChange = (name: string, value: string) => setAuth({ ...auth, [name]: value })

  return (
    <div className='column center middle max-h'>
      <div className='shadow-box column'>
        <h1 className='mb-2'>Авторизация</h1>
        <hr />
        <InputTextField
          name='name'
          onChange={handleChange}
          value={auth.name}
          icon='user'
          title='Your name'
          ph='enter your name'
          outColor='brand'
          disabled={isLoading}
          autoComplete={true}
        />
        <div className='row center justify mt-2'>
          <div />
          <button className='btn green' onClick={() => fetchSignIn(auth)} disabled={disabled || isLoading}>
            Login
          </button>
        </div>
      </div>
    </div>
  )
}
