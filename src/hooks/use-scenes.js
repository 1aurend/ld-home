import { useRef } from 'react'

export default function useScenes(sceneList, activeScenes, globalY) {
  const lastActive = useRef(0)
  const prevY = useRef(0)
  const currentScene = Object.keys(sceneList)
    .filter(num => globalY >= sceneList[num][0] && globalY <= sceneList[num][1])
    .map(Number)[0]

  if (activeScenes.indexOf(currentScene) === -1) {
    const animStart = sceneList[activeScenes[0]][0]
    const edge = globalY <= animStart ? 0 : 1
    const reverse = globalY < prevY.current ? -1 : 0
    return [ edge, activeScenes[lastActive.current+reverse] ]
  }

  const getLocalScrubPercent = (globalState, localStart, localEnd) => {
    const delta = localEnd - localStart
    const localState = (globalState - localStart) / delta
    return localState.toFixed(4)
  }
  const relY = getLocalScrubPercent(globalY, sceneList[currentScene][0], sceneList[currentScene][1])

  lastActive.current = activeScenes.indexOf(currentScene)
  prevY.current = globalY

  return [ relY, currentScene ]
}
