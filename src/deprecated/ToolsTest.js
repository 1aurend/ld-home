/** @jsxImportSource theme-ui */
import React, {
  useEffect,
  useCallback,
  useRef,
  useState
} from 'react'
import { useElementScroll } from 'framer-motion'
import { disableBodyScroll, enableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock'


const Controller = () => {
  const [progress, setProgress] = useState(0)
  const ref = useRef(null)
  const innerRef = useRef(null)
  const { scrollYProgress } = useElementScroll(ref)
  scrollYProgress.onChange(setProgress)

  useEffect(() => {
    if (ref.current) {
      console.log('here')
      console.log(ref.current)
      disableBodyScroll(ref.current)
    }
  }, [ref])

  return (
    <>
    <div
      ref={ref}
      sx={{
        height: '300px',
        width: '50vw',
        bg: 'DarkPurple1',
        overflow:'scroll'
      }}
      >
      <div
        ref={innerRef}
        sx={{
          height: '3000px',
          width: '50vw',
          bg: 'Orange1',
          overflow:'scroll'
        }}
        >
    </div>
    </div>
    <h1
      sx={{
        color:'white',
      }}
      >{progress}
    </h1>
    </>
  )
}

export default Controller
