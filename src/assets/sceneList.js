export const yMultiplier = 30
export const wheelMultiplier = 1.25

const sceneList = {
  1: [0,.03], //SPLASH
  2: [.03,.32], //DEV
  3: [.32,.37], //DTOE
  4: [.37,.66], //EDU
  5: [.66,.71], //ETOP
  6: [.71,.97], //PHIL
  7: [.97,1], //PTOC
}

//fix these for 0 buffer
export const playPause = {
  0: 0,
  1: .075,
  2: .15,
  3: .20,
  4: .245,
  5: .415,
  6: .49,
  7: .54,
  8: .585,
  9: .75,
  10: .81,
  11: .86,
  12: .91,
  13: 1,
}

//and these!
export const scrollToPoints = {
  philosopher: .75,
  educator: .415,
  developer: .075
}
export const scenes = {
  philosopher: sceneList[6],
  educator: sceneList[4],
  developer: sceneList[2]
}
export const colors = {
  philosopher: 'red',
  educator: 'teal',
  developer: 'purple'
}


export default sceneList
