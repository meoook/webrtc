import styles from './input.module.scss'
import { useRef } from 'react'
import InputFieldButtons from './components/InputFieldButtons'
import InputFieldIcon from './components/InputFieldIcon'
import InputFieldOutline from './components/InputFieldOutline'
import InputFieldError from './components/InputFieldError'

interface InputTextProps {
  title?: string // label with outline or placeholder
  name: string
  value: string
  type?: string
  ph?: string // Placeholder (displayed only with choices or with icon field)
  icon?: string // icon name before text
  errorText?: string // error text (out - red)
  helpText?: string // help text onHover info Icon
  outColor?: string // if set - display outline border & label control
  loading?: boolean // State for field loading (choices and icon)
  disabled?: boolean // disable ui control
  autoComplete?: boolean
  onChange: (name: string, value: string) => void
}

export default function InputTextField(props: InputTextProps) {
  // State
  const inRef = useRef<HTMLInputElement>(null)

  // useEffect(() => {
  //   if (inRef.current) {
  //     inRef.current.focus()
  //   }
  // }, [])

  // Const state
  const required = props.icon ? false : true
  const placeholder = !required || !props.title ? props.ph : ''
  const outlineColor = props.outColor
    ? props.errorText
      ? 'error'
      : props.disabled
      ? 'disabled'
      : props.loading
      ? 'warning'
      : props.outColor
    : ''

  // utils
  const checkFocus = () => {
    if (inRef.current !== document.activeElement) {
      inRef.current?.focus()
    }
  }

  // Handlers
  const handleClick = (event: React.MouseEvent<HTMLInputElement>) => {
    event.stopPropagation()
    if (props.disabled) return
    checkFocus()
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (props.disabled) return
    props.onChange(props.name, event.target.value)
  }

  const handleReset = (event: React.PointerEvent<HTMLInputElement>) => {
    event.stopPropagation()
    if (props.disabled) return
    checkFocus()
    props.onChange(props.name, '')
  }

  const sumClasses = (...classes: string[]) => classes.filter((item) => !!item).join(' ')

  return (
    <div className={styles.input} onClick={handleClick}>
      <div
        className={sumClasses(
          styles.root,
          props.disabled ? styles.disabled : '',
          props.icon ? styles.withIcon : '',
          props.helpText ? styles.two : styles.one
        )}>
        <input
          // className={styles.field}
          tabIndex={0}
          type={props.type || 'text'}
          autoComplete={props.autoComplete ? 'off' : 'new-password'}
          ref={inRef}
          value={props.value}
          onChange={handleChange}
          placeholder={placeholder}
          required={required}
          disabled={props.disabled}
        />
        {props.icon && <InputFieldIcon icon={props.icon} error={Boolean(props.errorText)} />}
        <InputFieldButtons
          canReset={Boolean(props.value)}
          reset={handleReset}
          helpText={props.helpText}
          loading={props.loading || false}
          disabled={props.disabled || false}
        />
        <InputFieldOutline title={props.title || ''} color={outlineColor} />
      </div>
      {props.errorText && <InputFieldError text={props.errorText} />}
    </div>
  )
}
