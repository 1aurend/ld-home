import { useMotionValue } from 'framer-motion'
import { useLayoutEffect } from 'react'


export default function useScrub(steps, state) {
  const thisStep = Array.isArray(steps) ? steps.filter(step => step.start <= state && state <= step.end).length > 0 ? steps.filter(step => step.start <= state && state <= step.end)[0] : steps[0] : steps
  const {
    from,
    init=false,
    to,
    unit,
    start,
    end,
    buffer=0.05
  } = thisStep
  const val = useMotionValue(init? from : null)

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
      if (state < start ) {
        if (start - state > buffer) {
          return
        }
        val.set(`${from}${unit}`)
        return
      }
      if (state > end) {
        if (state - end > buffer) {
          return
        }
        val.set(`${to}${unit}`)
        return
      }
      const currentScrubPercent = getScrubPercent(state, start, end)
      val.set(getCurrentVal(currentScrubPercent, from, to, unit))
      }

    setScrubMotionValue()
  }, [to, from, start, end, buffer, state, unit, val])

  return val
}
