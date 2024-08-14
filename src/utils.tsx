import { StylesConfig } from 'react-select'
import { IBot, IBotChange } from './model'

export const selectStyle: StylesConfig = {
  control: (styles, { isDisabled }) => ({
    ...styles,
    backgroundColor: 'transparent',
    backgroundImage: isDisabled
      ? 'linear-gradient(45deg, var(--color-input) 25%, transparent 25%, transparent 50%, var(--color-input) 50%, var(--color-input) 75%, transparent 75%, transparent)'
      : 'none',

    borderColor: 'var(--color-border)',
    padding: '2px 0',
    borderRadius: 'var(--padding)',
    minWidth: '225px',
  }),
  menu: (styles) => ({ ...styles, backgroundColor: 'var(--color-head)' }),
  singleValue: (styles, { isDisabled }) => ({
    ...styles,
    color: isDisabled ? 'var(--color-secondary)' : 'var(--color-primary)',
  }),
  option: (styles, { isFocused, isSelected }) => {
    return {
      ...styles,
      backgroundColor: isSelected ? 'var(--color-active)' : isFocused ? 'var(--color-input)' : 'var(--color-head)',
      color: isSelected ? 'var(--color-brand)' : 'var(--color-primary)',
    }
  },
  placeholder: (styles) => ({ ...styles, color: 'var(--color-secondary)' }),
}

export const mutateBotCfg = (full: IBot): IBotChange => {
  return {
    timeframe: full.timeframe,
    name: full.name,
    active: full.active,
    next_month: full.next_month,
    balance_limit: full.balance_limit,
    circles_limit: full.circles_limit,
    orders_limit: full.orders_limit,
    delta: full.delta,
  }
}
