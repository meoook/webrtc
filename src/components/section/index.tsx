import style from './section.module.scss'
import { useScreenSize } from '../../hooks'
import { IApiChannel } from '../../model'
import ChannelCard from '../channel'

interface SectionProps {
  title?: string
  channels: IApiChannel[]
  children?: React.ReactNode
}

export default function Section({ title, channels }: SectionProps) {
  const size = useScreenSize()
  const limit: number = Math.floor(size.width / 340)
  const list = channels.length > limit ? channels.slice(0, limit) : channels

  // {
  //   channels.map((channel) => <ChannelCard key={channel.id} channel={channel} />)
  // }
  return (
    <div className={style.section}>
      {title && <div className={style.title}>{title}</div>}
      <div className={style.row}>
        {list.map((channel) => (
          <ChannelCard key={channel.id} channel={channel} />
        ))}
      </div>
    </div>
  )
}
