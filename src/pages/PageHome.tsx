import { useContext, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { AppContext } from '../context/application/appContext'
import Container from '../elements/container'
import Section from '../components/section'

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
    <Container>{channels ? <Section title='Directory' channels={channels} /> : <div>Loading channels</div>}</Container>
  )
}
