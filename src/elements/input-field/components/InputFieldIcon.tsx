import Icon from '../../ico-get'
import styles from '../input.module.scss'

interface InputFieldProps {
  icon: string
  error: boolean
}

export default function InputFieldIcon({ icon, error }: InputFieldProps) {
  if (!icon) return null
  return <div className={styles.icon}>{error ? <Icon name='warning' /> : <Icon name={icon} />}</div>
}
