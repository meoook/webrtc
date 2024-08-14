import style from './trades.module.scss'
import { IBotTrade } from '../../model'
import { useGetTradesQuery } from '../../store/srv.api'
import Loader from '../../elements/loader'

interface BotMonthProps {
  pair: string
}

export default function BotMonthTrades({ pair }: BotMonthProps) {
  const { data: trades, isFetching } = useGetTradesQuery(pair)
  const haveTrades: boolean = Boolean(trades?.data.length)

  const tsToDate = (timestamp: number): string => {
    const date = new Date(timestamp)

    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0') // Months are zero-indexed
    const day = String(date.getDate()).padStart(2, '0')
    const hours = String(date.getHours()).padStart(2, '0')
    const minutes = String(date.getMinutes()).padStart(2, '0')
    const seconds = String(date.getSeconds()).padStart(2, '0')

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
  }

  return (
    <div className={style.trades}>
      <h1>{haveTrades && 'Trades'} </h1>
      {isFetching && <Loader />}
      {haveTrades && (
        <table className={style.table}>
          <thead>
            <tr>
              <th>side</th>
              <th>quantity</th>
              <th>price</th>
              <th>fee</th>
              <th>time</th>
            </tr>
          </thead>
          <tbody>
            {trades?.data.map((trade: IBotTrade) => (
              <tr key={trade.id}>
                <td>{trade.side}</td>
                <td>{trade.quantity}</td>
                <td>{trade.price}</td>
                <td>{trade.fee}</td>
                <td>{tsToDate(trade.time)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}
