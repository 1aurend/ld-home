import {
  useEffect,
  useState
} from 'react'


export default function useScrollAnimation(start, end, setter, state) {
  const [run, setRun] = useState(false) // turn into a counter for various animations states?
  const handleAnimation = e => {
    e.preventDefault()
    console.log(e)
    console.log(window.scrollY)
    if (e.deltaY > start && state && !run) {
      setter(false)
      setRun(true)
      setTimeout(() => document.body.style.overflow = 'scroll', 2000)
      return
    }
    // if (window.scrollY < end && !state && run) {
    //   setter(true)
    //   setRun(false)
    //   document.body.style.overflow = 'hidden'
    //   return
    // }
  }
  window.addEventListener('load', () => {window.scrollTo(0,0)} )
  window.addEventListener('wheel', handleAnimation)
  return () => window.removeEventListener('wheel', handleAnimation)
}
