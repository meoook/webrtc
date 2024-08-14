import style from './topbar.module.scss'
import BreadCrumbs from '../breadcrumbs'

interface TopbarProps {
  children?: React.ReactNode
}

export default function Topbar({ children }: TopbarProps) {
  return (
    <div className={style.topbar}>
      <BreadCrumbs />
      {children}
    </div>
  )
}
