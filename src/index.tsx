import './index.scss'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { ModalState } from './store/ModalContext'
import store from './store/store'
import NavRouter from './NavRouter'
import PopupMsgs from './components/pop-msg'
import Header from './components/header'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <BrowserRouter>
    <Provider store={store}>
      <Header />
      <PopupMsgs />
      <ModalState>
        <NavRouter />
      </ModalState>
    </Provider>
  </BrowserRouter>
)
