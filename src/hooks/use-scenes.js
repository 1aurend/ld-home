import useInterval from './use-interval'
import { useRef } from 'react'

export default function useScenes(sceneList, activeScenes, globalY) {
  const lastActive = useRef(0)
  const currentScene = Object.keys(sceneList)
    .filter(num => globalY >= sceneList[num][0] && globalY <= sceneList[num][1])
    .map(Number)[0]

  const relY = useInterval(sceneList[currentScene] ?? [0,1], globalY)

  if (activeScenes.indexOf(currentScene) === -1) {
    const animStart = sceneList[activeScenes[0]][0]
    const edge = globalY <= animStart ? 0 : 1
    return [ edge, activeScenes[lastActive.current] ]
  }

  lastActive.current = activeScenes.indexOf(currentScene)

  return [ relY, currentScene ]
}
