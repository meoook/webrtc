import Banner from '../components/banner'
import Footer from '../components/footer'
import Container from '../elements/container'

export default function PageHome() {
  return (
    <>
      <Container>
        <Banner title={`Multi chat rulet`} subtitle='Watch online streams for your favorite bloger' />
      </Container>
      <Footer />
    </>
  )
}
