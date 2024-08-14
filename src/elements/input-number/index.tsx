import styles from './number.module.scss'

interface InputNumberProps {
  title?: string
  name: string
  value: number
  min?: number
  max?: number
  disabled?: boolean
  onChange: (name: string, value: number) => void
}

export default function InputNumber(props: InputNumberProps) {
  const incrase = () => {
    if (props.max !== undefined && props.value >= props.max) props.onChange(props.name, props.min || 0)
    else props.onChange(props.name, props.value + 1)
  }
  const decrase = () => {
    if (props.min !== undefined && props.value <= props.min) props.onChange(props.name, props.max || 0)
    else props.onChange(props.name, props.value - 1)
  }

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let value = Number(event.target.value)
    if (props.max !== undefined && value >= props.max) props.onChange(props.name, props.max || 0)
    else if (props.min !== undefined && value <= props.min) props.onChange(props.name, props.min || 0)
    else props.onChange(props.name, value)
  }

  return (
    <div className={styles.box}>
      {props.title && <small>{props.title}</small>}
      <div className={props.disabled ? styles.disabled : styles.number}>
        {!props.disabled && <button onClick={decrase} />}
        <input name={props.name} value={props.value} type='number' onChange={onChange} disabled={props.disabled} />
        {!props.disabled && <button onClick={incrase} />}
      </div>
    </div>
  )
}
