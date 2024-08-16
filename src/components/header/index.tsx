import style from './header.module.scss'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useSingOutMutation } from '../../store/srv.api'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import LoaderCar from '../../elements/loader-car'
import iconArray from '../../elements/ico-get/icons'
import Icon from '../../elements/ico-get'
import { destroyToken } from '../../store/profile.slice'

export default function Header() {
  const { token, loading } = useAppSelector((state) => state.profile)

  return (
    <>
      {loading && <LoaderCar />}
      <header className={style.header}>
        <Link className={style.logo} to='/'>
          {iconArray.sun}&nbsp;
          <span>Video Chat</span>
        </Link>
        {Boolean(token) && (
          <nav>
            <NavLink to='/rooms'>
              {iconArray.user}
              <span>Rooms</span>
            </NavLink>
            <NavLink to='/favorites'>
              {iconArray.bots}
              <span>Favorites</span>
            </NavLink>
            <NavLink to='/streams'>
              {iconArray.bots}
              <span>Streams</span>
            </NavLink>
          </nav>
        )}
        {token ? <UserName token={token} /> : <Link to='/login'>Login</Link>}
      </header>
    </>
  )
}

function UserName({ token }: { token: string }) {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const logOut = () => {
    navigate('/', { replace: true })
    dispatch(destroyToken())
  }

  return (
    <div className={style.name}>
      {iconArray.wallet}
      <div title={token}>{token}</div>
      {iconArray.arr_down}
      <div className={style.dropdown}>
        <button className='btn gray' onClick={logOut}>
          <span>Logout</span>
          <Icon name='logout2' />
        </button>
      </div>
    </div>
  )
}
