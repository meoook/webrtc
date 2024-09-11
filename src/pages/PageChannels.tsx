import VideoCard from '../elements/video-card'

interface PageChannelsProps {
  children?: React.ReactNode
}
export default function PageChannels(props: PageChannelsProps) {
  const rooms: string[] = ['aaa', 'bbb', 'ccc', 'ddd']

  return (
    <>
      <h1>Page Channels</h1>
      <div className='grid'>
        {rooms.map((id) => (
          <VideoCard key={id} id={id} />
        ))}
      </div>
    </>
  )
}
