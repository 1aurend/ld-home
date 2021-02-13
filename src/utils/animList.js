
export const yMultiplier = 10
export const wheelMultiplier = 1.15

export const animations = {
  NAME: {
    out:{from:.01,to:.05},
    in:{from:.99, to:1.0}
  },
  SLIDER: {
    philosopher:{
      landscape: {
        x:{from:.01,to:.05},
        y:{from:.05,to:.05},
      },
      portrait: {
        x:{from:.025,to:.05},
        y:{from:.01,to:.025},
      }
    },
    educator:{
      landscape: {
        x:{from:.01,to:.035},
        y:{from:.035,to:.05},
      },
      portrait: {
        x:{from:0.035,to:.05},
        y:{from:.01,to:.035},
      }
    },
    developer:{
      landscape: {
        x:{from:.01,to:.02},
        y:{from:.02,to:.05}
      },
      portrait: {
        x:{from:.045,to:.05},
        y:{from:.01,to:.045}
      }
    }
  },
  DEVELOPER: {
    line:{
      extend:{from:.05,to:.09},
      shrink:{from:.26,to:.30}
    },
    tile:{
      topRadius:{from:.09,to:.095},
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
      extend:{from:.40,to:.44},
      shrink:{from:.61,to:.65}
    },
    tile:{
      topRadius:{from:.44,to:.445},
      grow:{from:.44,to:.52}
    },
    flips:{
      one:{from:.53,to:.55},
      two:{from:.56,to:.58},
      three:{from:.59,to:.61}
    }
  },
  ETOP:{from:.65,to:.75},
  PHILOSOPHER:{
    line:{
      extend:{from:.75,to:.79},
      shrink:{from:.96,to:1.0}
    },
    tile:{
      topRadius:{from:.79,to:.795},
      grow:{from:.79,to:.87}
    },
    flips:{
      one:{from:.88,to:.90},
      two:{from:.91,to:.93},
      three:{from:.94,to:.96}
    }
  },
  PTOEND:{from:.99,to:1.0},
}

// .05 = .01 -> .05
// .25 = .05 -> .30
// .1 = .30 -> .40
// .25 = .40 -> .65
// .1 = .65 -> .75
// .25 = .75 -> 1
