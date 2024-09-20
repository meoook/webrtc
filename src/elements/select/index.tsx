import style from './select.module.scss'

interface SelectOption {
  value: string | number
  name?: string | number
}

interface SelectProps {
  children?: React.ReactNode
  options: SelectOption[]
  placeholder?: string
  selected?: string | number
  onChange?: () => void
}

export default function Select({ options, placeholder, selected, onChange }: SelectProps) {
  return (
    <select className={style.select} onChange={onChange}>
      {placeholder && (
        <option disabled selected={!selected}>
          {placeholder}
        </option>
      )}
      {options.map((o) => (
        <option key={o.value} value={o.value} selected={selected === o.value}>
          {o.name || o.value}
        </option>
      ))}
    </select>
  )
}
