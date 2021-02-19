import { useState, useEffect } from 'react'
import sceneList from '../assets/sceneList'

export default function useScene(num, globalState) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const getLocalScrubPercent = (globalState, localStart, localEnd) => {
      const delta = localEnd - localStart
      const localState = ( globalState - localStart ) / delta
      return localState
    }
    const activeRange = sceneList[num]
    if (globalState < activeRange.from) {
      return setProgress(0)
    }
    if (globalState > activeRange.to) {
      return setProgress(1)
    }
    return setProgress(getLocalScrubPercent(globalState, activeRange.from, activeRange.to))
  }, [globalState, num])

  return progress
}
