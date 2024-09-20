import { useEffect, useRef, useState } from 'react'

export const useClickOutside = (): [React.RefObject<HTMLDivElement>, boolean, React.MouseEventHandler] => {
  const ref = useRef<HTMLDivElement>(null)
  const [open, setOpen] = useState<boolean>(false)

  useEffect(() => {
    const handler = (e: any) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => {
      document.removeEventListener('mousedown', handler)
    }
  })

  const toggle = () => setOpen((prev) => !prev)

  return [ref, open, toggle]
}

interface IScreenSize {
  width: number
  height: number
}

export const useScreenSize = () => {
  const [size, setSize] = useState<IScreenSize>({ width: window.innerWidth, height: window.innerHeight })

  useEffect(() => {
    const handleResize = () => {
      setSize({ width: window.innerWidth, height: window.innerHeight })
    }
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return size
}
