import { useContext, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { AppContext } from '../context/application/appContext'
import Banner from '../components/banner'
import Container from '../elements/container'

export default function PageHome() {
  const { authCode, channelsGet, channels } = useContext(AppContext)
  const [searchParams] = useSearchParams()

  useEffect(() => {
    const state: string | null = searchParams.get('state')
    const code: string | null = searchParams.get('code')
    if (state && code) authCode(state, code)
  }, [searchParams, authCode])

  useEffect(() => {
    channelsGet()
    // eslint-disable-next-line
  }, [])

  return (
    <Container>
      <Banner title='Stream rulet' subtitle='Watch online streams for your favorite bloger' />
    </Container>
  )
}
