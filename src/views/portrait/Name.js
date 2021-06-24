/** @jsxImportSource theme-ui */
import {
  useContext,
  useRef,
} from 'react'
import {
  motion,
  useMotionTemplate
} from 'framer-motion'
import useScrub from '../../hooks/use-scrub'
import { Y } from '../../Controller'
import Letter from '../Letter'
import scenes from '../../assets/sceneList'
import useScenes from '../../hooks/use-scenes'
import useSize from '../../hooks/use-debounced-window-size'
import useBoundingBox from '../../hooks/use-bounding-box'


const Name = ({ scrollTo, showCursor }) => {
  const y = useContext(Y)
  const size = useSize()

  const name = useRef(null)
  const { hX, bY } = useBoundingBox(name.current, y)

  const [relY, current] = useScenes(scenes, [1,7], y)

  const bottomKfs = {
    1: {
      0: `${bY || 0}px`,
      30: `${bY || 0}px`,
      95: `${size.height*0.02}px`,
      100: `${size.height*0.02}px`
    },
    7: {
      0: `${size.height*0.02}px`,
      40: `${bY}px`,
      100: size.height/size.width > 2 ? `${size.height*.32}px` : `${size.height*.25}px`
    }
  }
  const bottom = useScrub(bottomKfs[current], relY)
  const leftKfs = {
    1: {
      0: `${hX || 0}px`,
      2: `${hX || 0}px`,
      30: `${size.width*0.095}px`,
      100: `${size.width*0.095}px`
    },
    7: {
      0: `${size.width*0.095}px`,
      40: `${size.width*0.095}px`,
      100: `${hX}px`
    }
  }
  const left = useScrub(leftKfs[current], relY)

  const fontKfs = {
    1: {
      0: 1,
      30: 1,
      95: 0.65,
      100: 0.65
    },
    7: {
      0: 0.65,
      5: 0.65,
      40: 1,
      100: 1
    }
  }
  const fontSize = useScrub(fontKfs[current], relY)
  const scale = useMotionTemplate`scale(${fontSize})`

  const lKfs = {
    1: {
      0: {left:'0vw',top:'0vh'},
      26: {left:'0vw',top:'0vh'},
      30: {left:'-4.5vw',top:'5vh'},
      100: {left:'-4.5vw',top:'5vh'},
    },
    7: {
      0: {left:'-4.5vw',top:'5vh'},
      40: {left:'-4.5vw',top:'5vh'},
      44: {left:'0vw',top:'0vw'},
      100: {left:'0vw',top:'0vw'},
    }
  }
  const leftParams = {keyframes: lKfs[current], type: 'left'}
  const topParams = {keyframes: lKfs[current], type: 'top'}
  const lLeft = useScrub(leftParams, relY)
  const lTop = useScrub(topParams, relY)
  //fix these for responsive
  const moveL = useMotionTemplate`translate(min(${lLeft}, 50px), min(${lTop}, 60px))`

  return (
    <>
    <div
      id='name-flex'
      ref={name}
      sx={{
        fontFamily:'heading',
        fontSize:'clamp(30px, 14vw, 90px)',
        color:'Teal2',
        textAlign: 'right',
        lineHeight:'clamp(25px, 13vw, 80px)',
        width: 'auto',
        pb:'5vmin',
        boxSizing:'border-box',
        visibility:y <= 0.001 ? 'visible' : 'hidden',
        zIndex:20,
        flexDirection:'column',
        justifyContent:'flex-start'
      }}>
      <div>
        Lauren
      </div>
      <div>
        Davidson
      </div>
    </div>
    <motion.div
      id='name'
      onClick={() => scrollTo(0,size.height/2.5,0)}
      onMouseEnter={() => showCursor(true)}
      onMouseLeave={() => showCursor(false)}
      style={{
        transform:scale,
        left:left,
        bottom:bottom,
      }}
      sx={{
        fontFamily:'heading',
        fontSize:'clamp(30px, 14vw, 90px)',
        color:'Teal2',
        lineHeight:'clamp(25px, 13vw, 80px)',
        width: 'auto',
        pb:'5vmin',
        position:'absolute',
        transformOrigin:'bottom left',
        boxSizing:'border-box',
        zIndex:50,
        visibility:y > 0.001 ? 'visible' : 'hidden',
        cursor:'pointer',
        display:'flex',
        flexDirection:'column',
        justifyContent:'flex-end',
        alignItems:y > .98 ? 'center' : 'flex-end'
      }}>
      <div>
        <motion.span
          style={{
            transform:moveL
          }}
          sx={{
            display:'inline-block'
          }}>
          L
        </motion.span>
        <Letter
          val={'a'}
          z={26}
          out={20}
          back={45}
          />
        <Letter
          val={'u'}
          z={25}
          out={14}
          back={51}
          />
        <Letter
          val={'r'}
          z={24}
          out={11}
          back={54}
          />
        <Letter
          val={'e'}
          z={23}
          out={8}
          back={57}
          />
        <Letter
          val={'n'}
          z={22}
          out={5}
          back={60}
          />
      </div>
      <motion.div>
        <motion.span
          style={{
            // transform:moveD
          }}
          sx={{
            display:'inline-block'
          }}>
          D
        </motion.span>
        <Letter
          val={'a'}
          z={26}
          out={23}
          back={42}
          />
        <Letter
          val={'v'}
          z={25}
          out={20}
          back={45}
          />
        <Letter
          val={'i'}
          z={24}
          out={17}
          back={48}
          />
        <Letter
          val={'d'}
          z={23}
          out={14}
          back={51}
          />
        <Letter
          val={'s'}
          z={22}
          out={11}
          back={54}
          />
        <Letter
          val={'o'}
          z={21}
          out={8}
          back={57}
          />
        <Letter
          val={'n'}
          z={20}
          out={5}
          back={60}
          />
      </motion.div>
    </motion.div>
    </>
  )
}

export default Name
