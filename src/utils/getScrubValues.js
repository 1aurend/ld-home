const getScrubPercent = (current, start, end) => {
  const delta = end - start
  const currentVal = ( current - start ) / delta
  return currentVal
}

const getCurrentVal = (percentage, from, to, unit) => {
  // from: 20 to: 80 unit: px
  // from: 200 to: 0 unit: vh
  const delta = to - from
  const output = delta >= 0 ? (from+(delta * percentage)).toFixed(4) : (from-Math.abs(delta * percentage)).toFixed(4)
  return `${output}${unit}`
}

const getScrubValues = (current, start, end, motionValuesArr) => {
  if (current < start ) {
    if (start - current > 0.05) {
      return
    }
    motionValuesArr.forEach( motionValue => {
      motionValue.val.set(`${motionValue.from}${motionValue.unit}`)
    })
    return
  }
  if (current > end) {
    if (current - end > 0.05) {
      return
    }
    motionValuesArr.forEach( motionValue => {
      motionValue.val.set(`${motionValue.to}${motionValue.unit}`)
    })
    return
  }
  const percentage = getScrubPercent(current, start, end)
  motionValuesArr.forEach( motionValue => {
    motionValue.val.set(getCurrentVal(percentage, motionValue.from, motionValue.to, motionValue.unit))
  })
}

export default getScrubValues
