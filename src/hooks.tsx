import { useEffect, useRef, useState } from 'react'

export function useClickOutside(): [React.RefObject<HTMLDivElement>, boolean, React.MouseEventHandler] {
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
