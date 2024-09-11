import style from './user.module.scss'
import { useContext } from 'react'
import { AppContext } from '../../context/application/appContext'
import { Link } from 'react-router-dom'
import iconArray from '../../elements/ico-get/icons'
import { IApiUser } from '../../model'
import { useClickOutside } from '../../hooks'

export default function UserMenu({ user }: { user: IApiUser }) {
  const { authLogout } = useContext(AppContext)
  const [menuRef, open, toogle] = useClickOutside()
  const [notifyRef, isNotifyOpen, notifyToogle] = useClickOutside()

  return (
    <div className='row center'>
      <div ref={notifyRef} className={style.wrapper}>
        <button className={style.notifications} onClick={notifyToogle}>
          {iconArray.notifications}
          <div className={style.counter}>2</div>
        </button>
        {isNotifyOpen && (
          <div className={style.dropdown}>
            <div className={style.head}>
              <div>Notifications</div>
            </div>
          </div>
        )}
      </div>
      <div ref={menuRef} className={style.wrapper}>
        <button className={style.toogler} onClick={toogle}>
          <img src={user.avatar} alt='ava' />
        </button>
        {open && (
          <div className={style.dropdown}>
            <div className={style.head}>
              <div className={style.avatar}>
                <img src={user.avatar} alt='ava' />
              </div>
              <div>{user.username}</div>
            </div>
            <div className={style.section}>
              <Link to='/profile' className={style.item}>
                {iconArray.user}
                Profile
              </Link>
              <Link to={user.channel ? `/${user.channel}` : '/create'} className={style.item}>
                {iconArray.channels}
                {user.channel ? 'My channel' : 'Create channel'}
              </Link>
              <Link to='/wallet' className={style.item}>
                {iconArray.money}
                Balance: {user.balance}
              </Link>
              <button className={style.item} onClick={authLogout}>
                {iconArray.logout2}
                Exit
              </button>
            </div>
            <div className={style.section}>
              <button className={style.item}>
                {iconArray.nightlight}
                <span>Theme: dark</span>
                {iconArray.arr_right}
              </button>
              <button className={style.item}>
                {iconArray.language}
                <span>Language: English</span>
                {iconArray.arr_right}
              </button>
              <button className={style.item}>
                {iconArray.world}
                <span>Country: Russia</span>
                {iconArray.arr_right}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
