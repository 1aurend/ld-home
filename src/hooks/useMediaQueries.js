import {
  useState,
  useEffect,
  useCallback
} from 'react'


export default function useMediaQueries(queries) {
  const keys = Object.keys(queries)
  const mql = useState(
    Object.fromEntries(keys.map(key => {
      return [key, window.matchMedia(queries[key])]
    }))
  )[0]
  const handleMQMatches = useCallback((queries, init) => {
    if (init) {
      return Object.fromEntries(keys.map(key => {
        return [key, mql[key].matches]
      }))
    }
    return setMatches(Object.fromEntries(keys.map(key => {
      return [key, mql[key].matches]
    })))
  }, [mql, keys])
  const [matches, setMatches] = useState(handleMQMatches(queries, true))
  useEffect(() => {
    keys.forEach(media => {
      mql[media].addListener(handleMQMatches)
    })
    return () => {
      keys.forEach(media => {
        mql[media].removeListener(handleMQMatches)
      })
    }
  }, [handleMQMatches, mql, keys])
  return matches
}
