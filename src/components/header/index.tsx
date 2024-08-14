import style from './header.module.scss'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useGetUserQuery, useSingOutMutation } from '../../store/srv.api'
import { useAppSelector } from '../../store/hooks'
import LoaderCar from '../../elements/loader-car'
import iconArray from '../../elements/ico-get/icons'
import Icon from '../../elements/ico-get'

export default function Header() {
  const navigate = useNavigate()
  const { token, loading } = useAppSelector((state) => state.profile)
  const [signOut, { isLoading }] = useSingOutMutation()
  const { data: user } = useGetUserQuery(undefined, { skip: !Boolean(token) || isLoading })

  const logOut = () => {
    navigate('/', { replace: true })
    signOut()
  }

  return (
    <>
      {loading && <LoaderCar />}
      <header className={style.header}>
        <Link className={style.logo} to='/'>
          {iconArray.sun}
        </Link>
        {Boolean(token) && (
          <nav>
            <NavLink to='/profile'>
              {iconArray.user}
              <span>Profile</span>
            </NavLink>
            <NavLink to='/balance'>
              {iconArray.money}
              <span>Balance</span>
            </NavLink>
            <NavLink to='/bots'>
              {iconArray.bots}
              <span>Bots</span>
            </NavLink>
          </nav>
        )}
        {Boolean(token) ? (
          <UserAddress address={user?.address || ''} logOut={logOut} />
        ) : (
          <Link to='/login'>Login</Link>
        )}
      </header>
    </>
  )
}

function UserAddress({ address, logOut }: { address: string; logOut: () => void }) {
  const formatAddress = (addr: string): string => {
    const upperAfterLastTwo = addr.slice(0, 2) + addr.slice(2)
    return `${upperAfterLastTwo.substring(0, 5)}...${upperAfterLastTwo.substring(38)}`
  }

  return (
    <>
      <div className={style.address}>
        {iconArray.wallet}
        <div title={address}>{formatAddress(address)}</div>
        {iconArray.arr_down}
        <div className={style.dropdown}>
          <button className='btn gray' onClick={logOut}>
            <span>Disconnect</span>
            <Icon name='logout2' />
          </button>
        </div>
      </div>
    </>
  )
}
