const calculateSliderXs = (widths) => {
  const {
    pW,
    dW,
    eW,
    flexW,
  } = widths


    const scene = Object.keys(scenes)
      .filter(num => yPer >= scenes[num][0] && yPer <= scenes[num][1])
      .map(Number)[0]
    const vals = {
      pW: pSlider.current,
      eW: eSlider.current,
      dW: dSlider.current,
      flexW: flexW.current,
      type: scene === 2 ? 'developer' : scene === 4 ? 'educator' : scene === 6 ? 'philosopher' : null,
      size: size.width
    }

  const middleW = type === 'philosopher' ? pW : type === 'developer' ? dW : eW
  const rightW = type === 'philosopher' ? dW : type === 'developer' ? eW : pW
  const middleX = size/2 - middleW/2
  const leftX = size/2 - flexW/2
  const rightX = size/2 + flexW/2 - rightW

  return { leftX, middleX, rightX }
}

export default calculateSliderXs
