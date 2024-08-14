import style from './icon.module.scss'
import iconArray from './icons'

/**
 * @render react
 * @name IcoLang component
 * @description Country flags svg icons. Size 1em (change fontsize to resize)
 * @example
 * <IcoLang name='german' />
 */

const IcoLang = ({ name }: { name: string }) => {
  const langIcon = iconArray[name] || iconArray.world
  return <div className={style.Icon}>{langIcon}</div>
}

export default IcoLang
