import Banner from '../components/banner'

interface PageHomeProps {
  children?: React.ReactNode
}
export default function PageHome(props: PageHomeProps) {
  return (
    <>
      <Banner title={`Multi chat rulet`} subtitle='Watch online streams for your favorite bloger' />
    </>
  )
}
