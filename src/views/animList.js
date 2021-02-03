const animList = [
  {min:0, max:.13},
  {min:.13, max:.6}
]

export default animList

const yMultiplier = 10

export const animations = {
  SLIDER: {
    philosopher:{
      x:{from:.01,to:.05},
      y:{from:.05,to:.05},
    },
    educator:{
      x:{from:.01,to:.035},
      y:{from:.035,to:.05},
    },
    developer:{
      x:{from:.01,to:.02},
      y:{from:.02,to:.05}
    }
  },
  DEVELOPER: {
    line:{
      extend:{},
      shrink:{}
    },
    tile:{
      radius:{},
      grow:{}
    },
    flips:{}
  },
  DTOE:{},
  EDUCATOR:{},
  ETOP:{},
  PHILOSOPHER:{},
}

// Jx = .01 -> .05
// Jy = .025 -> .05
// DLine = .055 -> .13
// DTile = .13 -> .21
// DRadius = ?
// DFlips = .35 -> .36, .37 -> .38, .39 -> .40
// D-ETransition =
// ELine =
// ETile =
// ERadius =
// EFlips =
// E-PTransition =
// PLine =
// PRadius =
// PTile =
// PFlips = .95 -> .96, .97 -> .98, .99 -> 1

// .05 = .01 -> .05
// .25 = .05 -> .30
// .1 = .30 -> .40
// .25 = .40 -> .65
// .1 = .65 -> .75
// .25 = .75 -> 1
