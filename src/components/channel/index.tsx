import style from './channel.module.scss'
import { IApiChannel } from '../../model'
import { Link } from 'react-router-dom'
import iconArray from '../../elements/ico-get/icons'

interface ChannelCardProps {
  channel: IApiChannel
}

export default function ChannelCard({ channel }: ChannelCardProps) {
  return (
    <div className={style.card}>
      <Link to={`/channel/${channel.name}`} className={style.image}>
        {channel.is_online && <div className={style.live}>live</div>}
        <div className={style.viewvers}>
          {iconArray.eye}&nbsp;{channel.viewers}
        </div>
        {/* <img src={`/images/${channel.name}`} alt={channel.name} /> */}
        {/* <img src='https://static-cdn.jtvnw.net/previews-ttv/live_user_versuta-440x248.jpg' alt={channel.name} /> */}
        <img src={channel.image || '/no_image.jpg'} alt={channel.name} />
      </Link>
      <div className={style.layout}>
        <Link to={`/channel/${channel.name}`} className={style.avatar}>
          <img src={channel.avatar} alt='ava' />
        </Link>
        <div>
          <Link to={`/channel/${channel.name}`}>
            <div className={style.title} title={channel.title}>
              {channel.title}
            </div>
          </Link>
          <div>{channel.owner}</div>
          <div className={style.tags}>
            {channel.tags.map((tag) => (
              <Tag key={tag} name={tag} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function Tag({ name }: { name: string }) {
  return (
    <Link to={`/tags/${name}`} className={style.tag}>
      {name}
    </Link>
  )
}
