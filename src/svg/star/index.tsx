import style from './star.module.scss'

export const SvgFallingStars = () => {
  const array = Array(20).fill(0)

  return (
    <div className={style.night}>
      {array.map((_, idx) => (
        <div key={idx} className={style.shooting_star} />
      ))}
    </div>
  )
}
