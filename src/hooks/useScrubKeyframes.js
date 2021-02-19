import { useMotionValue } from 'framer-motion'
import { useLayoutEffect } from 'react'


const filter = (keyframes, type) => {
  return Object.keys(keyframes)
    .filter( key => keyframes[key][type] !== undefined)
    .reduce((acc, key) => Object.assign(acc, { [key]: keyframes[key] }), {})
}

const kfToSeg = (i, keyframes, type) => {
  const start = Object.keys(keyframes)[i-1]/100
  const end = Object.keys(keyframes)[i]/100
  const from = keyframes[Object.keys(keyframes)[i-1]][type]
  const to = keyframes[Object.keys(keyframes)[i]][type]
  return {
    start:start,
    end:end,
    from:from,
    to:to
  }
}

export default function useScrubKeyframes(params, state) {
  const {
    init,
    unit='',
    type,
    buffer=0.05,
    keyframes,
  } = params

  const validKfs = filter(keyframes, type)
  console.log(validKfs)
  const currentIndex = Object.keys(validKfs)
    .indexOf(
      Object.keys(validKfs)
      .filter(validKfs => state*100 <= validKfs)[0]
    )
    console.log(currentIndex)
  const currentSegment = currentIndex > 0 ?
    kfToSeg(currentIndex, validKfs, type) :
    currentIndex === 0 ?
      kfToSeg(1, validKfs, type) :
      kfToSeg(Object.keys(validKfs).length-1, validKfs, type)

  const val = useMotionValue(init? validKfs[Object.keys(validKfs)[0]][type] : '')

  useLayoutEffect(() => {
    const getScrubPercent = (current, start, end) => {
      const delta = end - start
      const currentPercent = ( current - start ) / delta
      return currentPercent
    }
    const getCurrentVal = (percent, from, to, unit) => {
      const delta = to - from
      const current = delta >= 0 ? (from+(delta * percent)).toFixed(4) : (from-Math.abs(delta * percent)).toFixed(4)
      return `${current}${unit}`
    }
    const setScrubMotionValue = () => {
      if (state < currentSegment.start) {
        if (currentSegment.start - state > buffer) {
          return
        }
        val.set(`${currentSegment.from}${unit}`)
        return
      }
      if (state > currentSegment.end) {
        if (state - currentSegment.end > buffer) {
          return
        }
        val.set(`${currentSegment.to}${unit}`)
        return
      }
      const currentScrubPercent = getScrubPercent(state, currentSegment.start, currentSegment.end)
      val.set(getCurrentVal(currentScrubPercent, currentSegment.from, currentSegment.to, unit))
      }

    setScrubMotionValue()
  }, [buffer, state, unit, val, currentSegment])

  return val
}
