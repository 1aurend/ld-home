import {
  useState,
  useEffect,
} from 'react'
import debounce from 'lodash.debounce'

export default function useRAFSize(wait=500, maxWait=1000) {
  const [dims, setDims] = useState({width:window.innerWidth, height: window.innerHeight})

  useEffect(()=>{
    const handleResize = e => {
      setDims({width:window.innerWidth, height: window.innerHeight})
    }
    const debouncedResize = debounce(handleResize, wait, {leading:false, trailing:true, maxWait:maxWait})
    window.addEventListener('resize', debouncedResize)
    return () => window.removeEventListener('resize', debouncedResize)
  },[wait, maxWait])

  return dims
}
