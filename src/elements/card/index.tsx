import style from './card.module.scss'

interface CardProps {
  children?: React.ReactNode
  wide?: boolean
  border?: boolean
  nopadding?: boolean
}

export default function Card({ children, wide, border, nopadding }: CardProps) {
  let blockStyle = style.card
  if (wide) blockStyle += ` ${style.wide}`
  if (border) blockStyle += ` ${style.border}`
  if (nopadding) blockStyle += ` ${style.nopadding}`
  return <div className={blockStyle}>{children}</div>
}
