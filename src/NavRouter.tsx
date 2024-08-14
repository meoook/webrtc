import { useEffect } from 'react'
import { Routes, Route, Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAppSelector } from './store/hooks'
import Page404 from './pages/Page404'
import PageHome from './pages/PageHome'
import PageLogin from './pages/PageLogin'
import Container from './elements/container'
import Footer from './components/footer'
import PageRoom from './pages/PageRoom'

export default function NavRouter() {
  return (
    <>
      <Container>
        <ScrollToTop />
        <Routes>
          <Route element={<LayoutProtected />}>
            <Route path='/room/:id' element={<PageRoom />} />
          </Route>
          <Route element={<LayoutNotAuthed />}>
            <Route path='/login' element={<PageLogin />} />
          </Route>
          <Route path='/' element={<PageHome />} />
          <Route path='*' element={<Page404 />} />
        </Routes>
      </Container>
      <Footer />
    </>
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
