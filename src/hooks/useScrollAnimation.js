import {
  useEffect,
  useState
} from 'react'


export default function useScrollAnimation(start, end, setter, state) {
  const [run, setRun] = useState(false)
  const handleAnimation = e => {
    e.preventDefault()
    const current = window.scrollY
    console.log(e)
    console.log(window.scrollY)
    if (e.deltaY > start && state && !run) {
      setter(false)
      setRun(true)
      return
    }
    // if (run) {
    //   window.scrollTo(e.deltaY)
    // }
    // if (current < end && !state) {
    //   setter(true)
    //   return
    // }
  }
  window.addEventListener('load', () => {window.scrollTo(0,0)} )
  window.addEventListener('wheel', handleAnimation)
  return () => window.removeEventListener('wheel', handleAnimation)
}
