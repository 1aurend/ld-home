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
      extend:{from:.055,to:.10},
      shrink:{from:.18,to:.21}
    },
    tile:{
      radius:{},
      grow:{from:.10,to:.18}
    },
    flips:{
      one:{from:.22,to:.24},
      two:{from:.25,to:.27},
      three:{from:.28,to:.30}
    }
  },
  DTOE:{from:.30,to:.40},
  EDUCATOR:{},
  ETOP:{from:.65,to:.75},
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
