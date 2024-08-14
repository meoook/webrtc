import styles from '../input.module.scss'

const InputFieldOutline = ({ title, color }: { title: string; color: string }) => {
  if (!color) return null
  const _className = () => {
    switch (color) {
      case 'error':
        return { className: styles.error }
      case 'warning':
        return { className: styles.warning }
      case 'success':
        return { className: styles.success }
      default:
        return
    }
  }
  return (
    <>
      {Boolean(title) && <label {..._className()}>{title}</label>}
      <fieldset {..._className()}>
        <legend>{Boolean(title) && <span>{title}</span>}</legend>
      </fieldset>
    </>
  )
}

export default InputFieldOutline
