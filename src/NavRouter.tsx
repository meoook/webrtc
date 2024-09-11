import { useContext, useEffect } from 'react'
import { Routes, Route, Navigate, Outlet, useLocation } from 'react-router-dom'
import { AppContext } from './context/application/appContext'
import PageHome from './pages/PageHome'
import PageLogin from './pages/PageLogin'
import PageChannel from './pages/PageChannel'
import PageChannels from './pages/PageChannels'
import Wrapper from './elements/wrapper'
import PageProfile from './pages/PageProfile'
import PageWallet from './pages/PageWallet'
import PageCreate from './pages/PageCreate'

export default function NavRouter() {
  return (
    <Wrapper>
      <ScrollToTop />
      <Routes>
        <Route element={<LayoutProtected />}>
          <Route path='/profile' element={<PageProfile />} />
          <Route path='/wallet' element={<PageWallet />} />
          <Route path='/create' element={<PageCreate />} />
        </Route>
        <Route element={<LayoutNotAuthed />}>
          <Route path='/login' element={<PageLogin />} />
        </Route>
        <Route path='/channels' element={<PageChannels />} />
        <Route path='/channels/:id' element={<PageChannel />} />
        <Route path='/' element={<PageHome />} />
        <Route path='*' element={<Page404 />} />
      </Routes>
    </Wrapper>
  )
}

function LayoutProtected() {
  const { token } = useContext(AppContext)
  if (!token) return <Navigate to='/login' replace />
  return <Outlet />
}

function LayoutNotAuthed() {
  const { token } = useContext(AppContext)
  if (token) return <Navigate to='/' replace />
  return <Outlet />
}

const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

function Page404() {
  return <h1>404 URL NOT FOUND</h1>
}
