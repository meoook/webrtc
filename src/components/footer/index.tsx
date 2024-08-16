import style from './footer.module.scss'

interface FotterProps {
  children?: React.ReactNode // image
}

export default function Footer({ children }: FotterProps) {
  return (
    <div className={style.footer}>
      <div className={style.content}>
        <div className='row justify'>
          <div className='column'>
            <div className={style.head}>ECOSYSTEM</div>
            <div>Streaming</div>
            <div>Blog</div>
            <div>Donate</div>
            <div>Restream</div>
          </div>
          <div className='column'>
            <div className={style.head}>BUSINESS</div>
            <div>ICO</div>
            <div>Partrnership</div>
          </div>
          <div className='column'>
            <div className={style.head}>DEVELOPERS</div>
            <div>Contributing</div>
            <div>Github</div>
            <div>V4</div>
          </div>
          <div className='column'>
            <div className={style.head}>SUPPORT</div>
            <div>Contact</div>
            <div>Troubleshooting</div>
            <div>Documentation</div>
          </div>
        </div>
        <hr />
        <div className={style.bottom}>
          <div>Twitter</div>
          <div>Telegram</div>
          {/* <div>Instagram</div> */}
          <div>Discord</div>
          <div>YouTube</div>
          <div>GitHub</div>
        </div>
      </div>
    </div>
  )
}
