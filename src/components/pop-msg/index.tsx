import style from './pop.module.scss'
import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { removeMessage } from '../../store/profile.slice'
import { IPopup } from '../../model'
import Icon from '../../elements/ico-get'

export default function PopupMsgs() {
  const { messages } = useAppSelector((state) => state.profile)

  return (
    <div className={style.msgframe}>
      {messages.map((message) => (
        <Message msg={message} key={message.id} />
      ))}
    </div>
  )
}

const Message = ({ msg }: { msg: IPopup }) => {
  const msgStyle = `${style.msgitem} ${style[msg.type]}${msg.nofade ? '' : ` ${style.fade}`}`
  const dispatch = useAppDispatch()

  const delMsg = (messageID: number) => {
    dispatch(removeMessage(messageID))
  }

  useEffect(() => {
    if (!msg.nofade) {
      setTimeout(() => {
        delMsg(msg.id)
      }, 4000)
    }
    // eslint-disable-next-line
  }, [])

  return (
    <div className={msgStyle}>
      <div className='row center'>
        <Icon name={msg.type} />
        <div className={style.context}>
          {msg.title && <h3>{msg.title} </h3>}
          {msg.text && <div>{msg.text}</div>}
        </div>
        <button className='btn-close' onClick={delMsg.bind(this, msg.id)}>
          &times;
        </button>
      </div>
      <div className={style.msgprogress} />
    </div>
  )
}
