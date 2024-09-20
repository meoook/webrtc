import style from './user.module.scss'
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { useClickOutside } from '../../hooks'
import { AppContext } from '../../context/application/appContext'
import { ModalContext } from '../../context/ModalContext'
import { IApiUser } from '../../model'
import iconArray from '../../elements/ico-get/icons'
import ModalProfile from '../../modals/profile'

export default function UserMenu({ user }: { user: IApiUser }) {
  const { authLogout } = useContext(AppContext)
  const [menuRef, isMenuOpen, menuToogle] = useClickOutside()
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
        <button className={style.toogler} onClick={menuToogle}>
          <img src={user.avatar} alt='ava' />
        </button>
        {isMenuOpen && (
          <div className={style.dropdown}>
            <div className={style.head}>
              <div className={style.avatar}>
                <img src={user.avatar} alt='ava' />
              </div>
              <div>{user.username}</div>
            </div>
            <div className={style.section}>
              {/* <Link to='/profile' className={style.item}>
                {iconArray.user}
                Profile
              </Link> */}
              <ProfileButton />
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

const ProfileButton = () => {
  const { modal, open } = useContext(ModalContext)

  return (
    <>
      {modal && <ModalProfile />}
      <button className={style.item} onClick={open}>
        {iconArray.user}
        Profile
      </button>
    </>
  )
}
