import useInterval from './use-interval'

export default function useScenes(sceneList, activeScenes, globalY) {
  const currentScene = Object.keys(sceneList)
    .filter(num => globalY >= sceneList[num][0] && globalY <= sceneList[num][1])
    .map(Number)[0]
  const intervalY = useInterval(sceneList[currentScene] ?? [0,1], globalY)
  const animStart = sceneList[activeScenes[0]][0]
  const relY = activeScenes.indexOf(currentScene) !== -1 ? intervalY : globalY <= animStart ? 0 : 1

  return [ relY, currentScene ]
}
