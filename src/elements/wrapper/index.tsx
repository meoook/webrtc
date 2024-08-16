import style from './wrapper.module.scss'

interface WrapperProps {
  children?: React.ReactNode
}

export default function Wrapper({ children }: WrapperProps) {
  return <div className={style.wrapper}>{children}</div>
}
