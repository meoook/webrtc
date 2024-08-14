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

// { title, subtitle, children }: BannerSmProps
export function BannerSm() {
  return (
    <>
      <div className={style.cards}>
        <div className={style.card}>
          <h1>Your Funds Protected</h1>
          <div>No direct access to your funds</div>
        </div>
        <div className={style.card}>
          <h1>Fee Only For Profit</h1>
          <div>We take comission only from earning</div>
        </div>
        <div className={style.card}>
          <h1>Easy to use</h1>
          <div>Start trading with few clicks</div>
        </div>
      </div>
      {/* <div className='row justify'>
        <div className={style.background}></div>
        <div className={style.background}></div>
        <div className={style.background}></div>
      </div> */}
    </>
  )
}
