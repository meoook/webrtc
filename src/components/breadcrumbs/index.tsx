import { Link, useLocation } from 'react-router-dom'
import style from './breadcrumbs.module.scss'

interface BreadCrumbsProps {
  children?: React.ReactNode
}

export default function BreadCrumbs(props: BreadCrumbsProps) {
  const location = useLocation()

  // Split the pathname into an array of path segments
  const pathSegments = location.pathname.split('/').filter((segment) => segment !== '')
  const pathElemsAmount = pathSegments.length
  // Build the breadcrumbs using the path segments

  return (
    <div className={style.breadcrumbs}>
      {pathSegments.map((segment, index) => {
        const path = `/${pathSegments.slice(0, index + 1).join('/')}`
        return (
          <div key={path}>
            <Link to={path}>{segment}</Link>
            {index + 1 !== pathElemsAmount && <span className={style.divider}>/</span>}
          </div>
        )
      })}
    </div>
  )
}
