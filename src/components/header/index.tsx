import style from './header.module.scss'
import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AppContext } from '../../context/application/appContext'
import LoaderCar from '../../elements/loader-car'
import iconArray from '../../elements/ico-get/icons'
import UserMenu from '../userMenu'

export default function Header() {
  const { loading, user } = useContext(AppContext)

  return (
    <>
      {loading && <LoaderCar />}
      <header className={style.header}>
        <div className={style.logo}>
          <Link className={style.link} to='/'>
            {iconArray.sun}&nbsp;
            <span>Stream rulet</span>
          </Link>
        </div>
        <div className={style.search}>
          <div className={style.input}>
            <input placeholder='Search' />
            <button className={style.btn} disabled>
              {iconArray.search}
            </button>
          </div>
        </div>
        <div className={style.menu}>{user ? <UserMenu user={user} /> : <Link to='/login'>Login</Link>}</div>
      </header>
    </>
  )
}
