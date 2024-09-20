import style from './modal.module.scss'
import { useContext } from 'react'
import { ModalContext } from '../../context/ModalContext'
import iconArray from '../../elements/ico-get/icons'

interface ModalProps {
  children?: React.ReactNode
}

export default function Modal({ children }: ModalProps) {
  const { close } = useContext(ModalContext)
  const handle = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation()
  }

  return (
    <div className={style.bg} onClick={close}>
      <div className={style.modal} onClick={handle}>
        <button className={style.close} onClick={close}>
          {iconArray.close}
        </button>
        {children}
      </div>
    </div>
  )
}
