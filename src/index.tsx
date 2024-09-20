import './index.scss'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { ModalState } from './context/ModalContext'
import NavRouter from './NavRouter'
import PopupMsgs from './components/pop-msg'
import Header from './components/header'
import AppState from './context/application/AppState'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <BrowserRouter>
    <AppState>
      <ModalState>
        <Header />
        <PopupMsgs />
        <NavRouter />
      </ModalState>
    </AppState>
  </BrowserRouter>
)
