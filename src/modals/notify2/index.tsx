import style from './notify.module.scss'

interface NotifyProps {
  children?: React.ReactNode
  type: 'info' | 'warning' | 'error'
  icon?: boolean
}

export default function Notify({ children, type, icon }: NotifyProps) {
  let blockStyle = style.notify
  if (type === 'info') blockStyle += ` ${style.info}`
  else if (type === 'warning') blockStyle += ` ${style.warning}`
  else if (type === 'error') blockStyle += ` ${style.error}`
  return <div className={blockStyle}>{children}</div>
}
