import style from './pop.module.scss'
import { useContext, useEffect } from 'react'
import { AppContext } from '../../context/application/appContext'
import { IPopup } from '../../model'
import Icon from '../../elements/ico-get'

export default function PopupMsgs() {
  const { popups, delPopup } = useContext(AppContext)

  return (
    <div className={style.msgframe}>
      {popups.map((popup) => (
        <Popup popup={popup} key={popup.id} delPopup={delPopup} />
      ))}
    </div>
  )
}

const Popup = ({ popup, delPopup }: { popup: IPopup; delPopup: (id: number) => void }) => {
  const msgStyle = `${style.msgitem} ${style[popup.type]}${popup.nofade ? '' : ` ${style.fade}`}`

  const delMsg = (messageID: number) => {
    delPopup(messageID)
  }

  useEffect(() => {
    if (!popup.nofade) {
      setTimeout(() => {
        delMsg(popup.id)
      }, 4000)
    }
    // eslint-disable-next-line
  }, [])

  return (
    <div className={msgStyle}>
      <div className='row center'>
        <Icon name={popup.type} />
        <div className={style.context}>
          {popup.title && <h3>{popup.title} </h3>}
          {popup.text && <div>{popup.text}</div>}
        </div>
        <button className='btn-close' onClick={delMsg.bind(this, popup.id)}>
          &times;
        </button>
      </div>
      <div className={style.msgprogress} />
    </div>
  )
}
