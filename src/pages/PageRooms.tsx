import VideoCard from '../elements/video-card'

interface PageRoomsProps {
  children?: React.ReactNode
}
export default function PageRooms(props: PageRoomsProps) {
  const rooms: string[] = ['aaa', 'bbb', 'ccc', 'ddd']

  return (
    <>
      <h1>Page rooms</h1>
      <div className='grid'>
        {rooms.map((id) => (
          <VideoCard key={id} id={id} />
        ))}
      </div>
    </>
  )
}
