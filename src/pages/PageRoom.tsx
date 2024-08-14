import { useGetAccountQuery, useGetUserQuery } from '../store/srv.api'
import { useParams } from 'react-router-dom'
import Card from '../elements/card'

interface PageProfileProps {
  children?: React.ReactNode
}
export default function PageRoom(props: PageProfileProps) {
  const { id } = useParams()
  const { data: user } = useGetUserQuery()
  const { data: account } = useGetAccountQuery(user?.account.id, { skip: !user?.account.id })

  return <Card border={true}></Card>
}
