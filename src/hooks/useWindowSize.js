import {
  useState,
  useEffect
} from 'react'
export default function useAspectRatio() {
  const [dimensions, setDimensions] = useState({
                                                width: window.innerWidth,
                                                height: window.innerHeight,
                                              })
  const handleResize = () => {
    setDimensions({
                    width: window.innerWidth,
                    height: window.innerHeight,
                  })
  }
  useEffect(() => {
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  },[])
  return dimensions
}
