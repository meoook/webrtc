import Icon from '../../ico-get'

export default function InputFieldValues({ values, removeVal }: { values: string[]; removeVal: Function }) {
  if (!Boolean(values)) return null
  return (
    <>
      {values.map((item) => (
        <div key={item} className='input-value'>
          <div>{item}</div>
          <button className='btn btn-nop' onClick={removeVal.bind(item)}>
            <Icon name='close' />
          </button>
        </div>
      ))}
    </>
  )
}
