import { useContext, useState } from 'react'
import { AppContext } from '../context/application/appContext'

export default function PageLogin() {
  const [disabled, setDisabled] = useState(false)
  const { authNetwork } = useContext(AppContext)

  const handleLogin = (e: React.MouseEvent<HTMLButtonElement>) => {
    setDisabled(true)
    authNetwork(e.currentTarget.name)
  }

  return (
    <div className='column center middle max-h'>
      <div className='shadow-box column'>
        <h1 className='mb-2'>Войти с помощью</h1>
        <hr />
        <button className='btn green' name='google' onClick={handleLogin} disabled={disabled}>
          Google
        </button>
      </div>
    </div>
  )
}
