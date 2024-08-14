import style from './bot.module.scss'
import { Link } from 'react-router-dom'
import { IBot } from '../../model'

interface BotProps {
  children?: React.ReactNode
  account?: string
  bot: IBot
}

export default function Bot({ bot }: BotProps) {
  const [base, quote] = bot.pair.split(':')
  return (
    <Link to={`/bots/${bot.id}`}>
      <div className={style.bot}>
        <div>
          <div className={style.head}>
            <div className='row'>
              <span>{bot.active ? '✔️' : '❌'}</span>
              <span className='pr-2'>{bot.pair}</span>
              <span>{bot.timeframe}</span>
            </div>
            <div>ID: {bot.id}</div>
          </div>
          <hr />
        </div>
        <div className='row justify'>
          <div className='col column'>
            <div>Balance</div>
            <div>${bot.indicator?.balance.toFixed(2) || 0}</div>
          </div>
          <div className='col column'>
            <div>Limit</div>
            <div>{bot.balance_limit}%</div>
          </div>
          <div className='col column'>
            <div>{base}</div>
            <div>{bot.indicator?.base || 0}</div>
          </div>
          <div className='col column'>
            <div>{quote}</div>
            <div>{bot.indicator?.quote || 0}</div>
          </div>
        </div>
      </div>
    </Link>
  )
}
