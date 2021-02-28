import { createContext } from 'react'
import useSize from '../hooks/use-debounced-window-size'
import Layout from './Layout'
import { yMultiplier, wheelMultiplier } from '../assets/sceneList'
import useWheelY from '../hooks/use-wheel-y'

export const Y = createContext()


export default function Controller() {
  const size = useSize()
  const { y, scrollTo } = useWheelY(yMultiplier, wheelMultiplier, size)

  return (
    <Y.Provider value={y.percent}>
      <Layout scrollTo={scrollTo} />
    </Y.Provider>
  )
}
