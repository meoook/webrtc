import styles from './switch.module.scss'
import Icon from '../ico-get'

interface InputSwitchProps {
  title?: string
  name: string
  value: boolean
  type?: string
  size?: string
  disabled?: boolean
  onChange?: (name: string, value: boolean) => void
}

const InputSwitch = (props: InputSwitchProps) => {
  const sumClasses = (...classes: string[]) => classes.filter((item) => !!item).join(' ')

  const typeClass = (style?: string): string => {
    if (style === 'toggle') return styles.toggle
    if (style === 'radio') return styles.radio
    if (style === 'check') return styles.check
    return styles.toggle
  }
  const sizeClass = (size?: string): string => {
    if (size === 'small') return styles.small
    if (size === 'big') return styles.big
    return ''
  }

  const nameClass = sumClasses(
    styles.btn,
    sizeClass(props.size),
    typeClass(props.type),
    props.value ? styles.active : '',
    props.disabled ? styles.disabled : ''
  )

  const toogle = () => {
    if (!props.disabled && props.onChange) props.onChange(props.name, !props.value)
  }

  return (
    // <div className={nameClass} onClick={toogle} disabled={disabled}>
    <div className={`${styles.switch} ${props.disabled ? styles.disabled : ''}`} onClick={toogle}>
      {props.title && <small>{props.title}</small>}
      <div className={nameClass}>
        <div className={styles.mark}>{props.type === 'check' && <Icon name='check' />}</div>
      </div>
    </div>
  )
}

export default InputSwitch
