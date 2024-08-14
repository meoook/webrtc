import styles from '../input.module.scss'

export default function InputFieldError({ text }: { text: string }) {
  if (!Boolean(text)) return null
  return <div className={styles.errorMsg}>{text}</div>
}
