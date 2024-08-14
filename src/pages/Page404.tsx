import { useAppDispatch } from '../store/hooks'
import { addMessage } from '../store/profile.slice'
import { IPopupOptions } from '../model'
import Icon from '../elements/ico-get'
import IcoLang from '../elements/ico-lang'
import { SvgFallingStars } from '../svg/star'

interface Page404Props {
  children?: React.ReactNode
}
export default function Page404(props: Page404Props) {
  const dispatch = useAppDispatch()

  const addMsg = (msg: IPopupOptions) => {
    dispatch(addMessage(msg))
  }
  const grades: string[] = ['default', 'info', 'success', 'warning', 'error']

  const doJob = () => {
    grades.forEach((grade, idx) => {
      setTimeout(() => {
        addMsg({
          type: grade,
          text: 'Fugiat tempore voluptas nobis, aperiam mollitia, ullam odio, ipsa animi!',
          title: 'Test',
          nofade: false,
        })
      }, idx * 1000)
    })
  }

  return (
    <>
      <SvgFallingStars />
      <h1 onClick={doJob}>404 URL NOT FOUND 🎼🦴🐾🚧🛰🚀💛</h1>
      <div className='row justify'>
        <Icon name='add_o' />
        <Icon name='arrows' />
        <Icon name='arr_down' />
        <Icon name='apartment' />
        <Icon name='bots' />
        <Icon name='backup' />
        <Icon name='close' />
        <Icon name='check' />
        <Icon name='check2' />
        <Icon name='description' />
        <Icon name='document' />
        <Icon name='error' />
        <Icon name='folder_o' />
        <Icon name='key' />
        <Icon name='languages' />
        <Icon name='logout' />
        <Icon name='logout2' />
        <Icon name='menu' />
        <Icon name='metamask' />
        <Icon name='money' />
        <Icon name='more' />
        <Icon name='info' />
        <Icon name='search' />
        <Icon name='settings' />
        <Icon name='settings_mob' />
        <Icon name='sorting' />
        <Icon name='splash' />
        <Icon name='storage' />
        <Icon name='statistic' />
        <Icon name='subject' />
        <Icon name='success' />
        <Icon name='tultip' />
        <Icon name='user' />
        <Icon name='wallet' />
        <Icon name='warning' />
        <Icon name='warning2' />
        <Icon name='work' />
        <Icon name='work_out' />
      </div>
      <div className='row justify'>
        <IcoLang name='chinese' />
        <IcoLang name='english' />
        <IcoLang name='german' />
        <IcoLang name='italian' />
        <IcoLang name='russian' />
        <IcoLang name='spanish' />
        <IcoLang name='world' />
        <IcoLang name='test' />
      </div>
    </>
  )
}
