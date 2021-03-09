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

export const scrollToPoints = {
  philosopher: .76,
  educator: .42,
  developer: .08
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
