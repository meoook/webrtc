import style from './header.module.scss'
import { useContext } from 'react'
import { AppContext } from '../../context/application/appContext'
import { Link } from 'react-router-dom'
import LoaderCar from '../../elements/loader-car'
import iconArray from '../../elements/ico-get/icons'
import UserMenu from '../userMenu'

export default function Header() {
  const { loading, user } = useContext(AppContext)

  return (
    <>
      {loading && <LoaderCar />}
      <header className={style.header}>
        <Link className={style.logo} to='/'>
          {iconArray.sun}&nbsp;
          <span>Stream rulet</span>
        </Link>
        {/* {Boolean(token) && (
          <nav>
            <NavLink to='/channels'>
              {iconArray.user}
              <span>Channels</span>
            </NavLink>
            <NavLink to='/streams'>
              {iconArray.bots}
              <span>Streams</span>
            </NavLink>
          </nav>
        )} */}
        <input placeholder='search' className={style.search} />
        {user ? <UserMenu user={user} /> : <Link to='/login'>Login</Link>}
      </header>
    </>
  )
}
