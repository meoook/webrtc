import { useEffect } from 'react'
import { Routes, Route, Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAppSelector } from './store/hooks'
import PageHome from './pages/PageHome'
import PageLogin from './pages/PageLogin'
import PageRoom from './pages/PageRoom'
import PageRooms from './pages/PageRooms'
import Wrapper from './elements/wrapper'

export default function NavRouter() {
  return (
    <Wrapper>
      <ScrollToTop />
      <Routes>
        <Route element={<LayoutProtected />}>
          <Route path='/rooms' element={<PageRooms />} />
          <Route path='/rooms/:id' element={<PageRoom />} />
        </Route>
        <Route element={<LayoutNotAuthed />}>
          <Route path='/login' element={<PageLogin />} />
        </Route>
        <Route path='/' element={<PageHome />} />
        <Route path='*' element={<Page404 />} />
      </Routes>
    </Wrapper>
  )
}

function LayoutProtected() {
  const { token } = useAppSelector((state) => state.profile)
  if (!token) return <Navigate to='/login' replace />
  return <Outlet />
}

function LayoutNotAuthed() {
  const { token } = useAppSelector((state) => state.profile)
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
