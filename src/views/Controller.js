/** @jsxImportSource theme-ui */
import React, {
  useState,
  useEffect,
  useCallback
} from 'react'
import Splash from './Splash'
import Cursor from './Cursor'


export default function Controller({ children }) {
  const [toVert, setToVert] = useState(false)

  const handleAnimation = useCallback(e => {
    e.preventDefault()
    if (!toVert) {
      setToVert(true)
    }
    return () => window.removeEventListener('wheel', handleAnimation)
  }, [toVert])

  useEffect(() => {
    window.addEventListener('load', () => {window.scrollTo(0,0)})
    window.addEventListener('wheel', handleAnimation)
  }, [handleAnimation])

  return (
    <>
    <Splash
      toVert={toVert}
      />
    <div
      sx={{
        height:'100%',
        width:'100%',
        backgroundColor:'Teal1',
      }}>
    </div>
    </>
  )
}
