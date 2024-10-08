// import { useGetAccountQuery, useGetUserQuery } from '../store/srv.api'
import { Navigate, useParams } from 'react-router-dom'
import Room from '../components/room'

interface PageProfileProps {
  children?: React.ReactNode
}
export default function PageChannel(props: PageProfileProps) {
  const { id } = useParams()
  // const { data: user } = useGetUserQuery()
  // const { data: account } = useGetAccountQuery(user?.account.id, { skip: !user?.account.id })

  if (!id) return <Navigate to='/' replace />
  return <Room room_id={id} />
}
