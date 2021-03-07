import {
  useState,
  useEffect,
  useCallback
} from 'react'

export default function useMediaQueries(queries) {
  const keys = Object.keys(queries)

  const queryList = useState(
    Object.fromEntries(keys.map(key => {
      return [key, window.matchMedia(queries[key])]
    }))
  )[0]

  const [matches, setMatches] = useState(
    Object.fromEntries(
      keys.map(key => {
        return [key, queryList[key].matches]
  })))

  const handleMQMatches = useCallback(() => {
    return setMatches(Object.fromEntries(keys.map(key => {
      return [key, queryList[key].matches]
    })))
  }, [queryList, keys])

  useEffect(() => {
    keys.forEach(media => {
      queryList[media].addListener(handleMQMatches)
    })
    return () => {
      keys.forEach(media => {
        queryList[media].removeListener(handleMQMatches)
      })
    }
  }, [handleMQMatches, queryList, keys])

  return matches
}
