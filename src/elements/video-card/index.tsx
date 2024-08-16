import { NavLink } from 'react-router-dom'
import style from './card.module.scss'

interface CardProps {
  id: string
  // title: string
  // tag: string
  // author: string
  // language: string
  children?: React.ReactNode
  border?: boolean
  nopadding?: boolean
}

export default function VideoCard({ id, children, border, nopadding }: CardProps) {
  let blockStyle = style.card
  if (border) blockStyle += ` ${style.border}`
  if (nopadding) blockStyle += ` ${style.nopadding}`
  return (
    <NavLink to={`/rooms/${id}`}>
      <div className={blockStyle}>Room {id}</div>
    </NavLink>
  )
}
