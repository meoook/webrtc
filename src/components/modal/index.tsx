import { useContext } from 'react'
import style from './modal.module.scss'
import { ModalContext } from '../../context/ModalContext'

interface ModalProps {
  children?: React.ReactNode
  title?: string
}

export default function Modal({ children, title }: ModalProps) {
  const { close } = useContext(ModalContext)

  return (
    <>
      <div className={style.bg} onClick={close} />
      <div className={style.modal}>
        {title && <div className={style.title}>{title}</div>}
        {children}
      </div>
    </>
  )
}
