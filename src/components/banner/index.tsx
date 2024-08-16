import style from './banner.module.scss'

interface BannerProps {
  children?: React.ReactNode // image
  title: string
  subtitle?: string
}

export default function Banner({ title, subtitle, children }: BannerProps) {
  return (
    <div className={style.banner}>
      <div className={style.content}>
        <div className={style.title}>{title}</div>
        {subtitle && <div className={style.subtitle}>{subtitle}</div>}
      </div>
      {children && <div className={style.content}>{children}</div>}
    </div>
  )
}
