import Icon from '../../elements/ico-get'
import Loader from '../../elements/loader'
import style from './valid.module.scss'

interface ValidProps {
  children?: React.ReactNode
  valid?: boolean
}

export default function Valid({ valid }: ValidProps) {
  return (
    <>
      {valid === undefined ? (
        <span className={style.load}>
          <Loader />
        </span>
      ) : valid ? (
        <span className={style.ok}>
          <Icon name='check' />
        </span>
      ) : (
        <span className={style.err}>
          <Icon name='warning' />
        </span>
      )}
    </>
  )
}
