import Icon from '../../ico-get'
import Loader from '../../loader'
import styles from '../input.module.scss'

interface InputFieldProps {
  canReset: boolean
  reset: (event: React.PointerEvent<HTMLInputElement>) => void
  helpText?: string
  loading: boolean
  disabled: boolean
}

export default function InputFieldButtons(props: InputFieldProps) {
  if (!props.canReset && !props.helpText && !props.loading) return null
  if (props.disabled) {
    if (!props.loading) return null
    return (
      <div className={styles.btns}>
        <Loader />
      </div>
    )
  }
  return (
    <div className={styles.btns}>
      {props.loading ? <Loader /> : <ResetToggle avalible={props.canReset} reset={props.reset} />}
      {props.helpText && <HelpIcon text={props.helpText} />}
    </div>
  )
}

function ResetToggle({ avalible, reset }: { avalible: boolean; reset: React.MouseEventHandler }) {
  if (!avalible || !reset) return null
  return (
    <button tabIndex={-1} className={styles.reset + ' btn btn-ico'} onClick={reset}>
      <Icon name='error' />
    </button>
  )
}

function HelpIcon({ text }: { text: string }) {
  if (!text) return null
  return (
    <div className={styles.help}>
      <Icon name='tultip' />
      <div className={styles.helpText}>{text}</div>
    </div>
  )
}
