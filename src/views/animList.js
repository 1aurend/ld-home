// const animList = [
//   {min:0, max:.13},
//   {min:.13, max:.6}
// ]
//
// export default animList

export const yMultiplier = 10

export const animations = {
  NAME: {from:.01,to:.05},
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
      extend:{from:.05,to:.09},
      shrink:{from:.26,to:.30}
    },
    tile:{
      radius:{},
      grow:{from:.09,to:.17}
    },
    flips:{
      one:{from:.18,to:.20},
      two:{from:.21,to:.23},
      three:{from:.24,to:.26}
    }
  },
  DTOE:{from:.30,to:.40},
  EDUCATOR:{
    line:{
      extend:{from:.40,to:.45},
      shrink:{from:.53,to:.56}
    },
    tile:{
      radius:{},
      grow:{from:.45,to:.53}
    },
    flips:{
      one:{from:.57,to:.59},
      two:{from:.60,to:.62},
      three:{from:.63,to:.65}
    }
  },
  ETOP:{from:.65,to:.75},
  PHILOSOPHER:{
    line:{
      extend:{from:.75,to:.80},
      shrink:{from:.88,to:.91}
    },
    tile:{
      radius:{},
      grow:{from:.80,to:.88}
    },
    flips:{
      one:{from:.92,to:.94},
      two:{from:.95,to:.97},
      three:{from:.98,to:1.0}
    }
  },
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
