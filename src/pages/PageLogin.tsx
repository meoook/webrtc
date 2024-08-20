import { useState } from 'react'
import InputTextField from '../elements/input-field'

export default function PageLogin() {
  const [auth, setAuth] = useState({ name: '' })
  const [disabled, setDisabled] = useState(false)

  const handleChange = (name: string, value: string) => setAuth({ ...auth, [name]: value })

  const handleLogin = () => {
    setDisabled(true)
  }

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
          disabled={disabled}
          autoComplete={true}
        />
        <div className='row center justify mt-2'>
          <div />
          <button className='btn green' onClick={handleLogin} disabled={disabled || !auth.name}>
            Login
          </button>
        </div>
      </div>
    </div>
  )
}
