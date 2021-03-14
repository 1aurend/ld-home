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
import Letter from './Letter'
import scenes from '../../assets/sceneList'
import useScenes from '../../hooks/use-scenes'
import useSize from '../../hooks/use-debounced-window-size'
import useBoundingBox from '../../hooks/use-bounding-box'


const Name = ({ scrollTo, showCursor }) => {
  const y = useContext(Y)
  const size = useSize()

  const name = useRef(null)
  const { hX, hY } = useBoundingBox(name.current, y)

  const [relY, current] = useScenes(scenes, [1,7], y)

  const topKfs = {
    1: {
      0: `${hY || 0}px`,
      2: `${hY || 0}px`,
      50: `${size.height*0.04}px`,
      100: `${size.height*0.04}px`
    },
    7: {
      0: `${size.height*0.04}px`,
      80: `${size.height*0.04}px`,
      100: `${hY/2.5}px`
    }
  }
  const top = useScrub(topKfs[current], relY)
  const leftKfs = {
    1: {
      0: `${hX || 0}px`,
      50: `${hX || 0}px`,
      95: `${size.width*0.025}px`,
      100: `${size.width*0.025}px`
    },
    7: {
      0: `${size.width*0.025}px`,
      5: `${size.width*0.025}px`,
      80: `${hX}px`,
      100: `${hX}px`
    }
  }
  const left = useScrub(leftKfs[current], relY)

  const fontKfs = {
    1: {
      0: 1,
      30: 1,
      50: 0.5,
      100: 0.5
    },
    7: {
      0: 0.5,
      80: 0.5,
      100: 0.8
    }
  }
  const fontSize = useScrub(fontKfs[current], relY)
  const scale = useMotionTemplate`scale(${fontSize})`

  const dKfs = {
    1: {
      0: {left:'0vw',top:'0vw'},
      95: {left:'0vw',top:'0vw'},
      100: {left:'-1.75vw',top:'1vw'},
    },
    7: {
      0: {left:'-1.75vw',top:'1vw'},
      5: {left:'0vw',top:'0vw'},
      100: {left:'0vw',top:'0vw'},
    }
  }
  const leftParams = {keyframes: dKfs[current], type: 'left'}
  const topParams = {keyframes: dKfs[current], type: 'top'}
  const dLeft = useScrub(leftParams, relY)
  const dTop = useScrub(topParams, relY)
  const moveD = useMotionTemplate`translate(max(${dLeft}, -40px), max(${dTop}, -22px))`

  const display = current === 1 && relY >= .94 ? 'none' : current === 7 && relY <= .06 ? 'none' : ''

  return (
    <>
    <div
      id='name-flex'
      ref={name}
      sx={{
        fontFamily:'heading',
        fontSize:'clamp(36px, 6vw, 100px)',
        color:'Teal2',
        textAlign:'center',
        justifySelf:'center',
        alignSelf:'center',
        lineHeight:'clamp(36px, 6vw, 100px)',
        width: 'auto',
        pb:'5vmin',
        boxSizing:'border-box',
        visibility:y <= 0.001 ? 'visible' : 'hidden',
        zIndex:20
      }}>
      Lauren Davidson
    </div>
    <motion.div
      id='name'
      onClick={() => scrollTo(0,size.height/2.5,0)}
      onMouseEnter={() => showCursor(true)}
      onMouseLeave={() => showCursor(false)}
      style={{
        transform:scale,
        left:left,
        top:top,
      }}
      sx={{
        fontFamily:'heading',
        fontSize:'clamp(36px, 6vw, 100px)',
        color:'Teal2',
        lineHeight:'clamp(36px, 6vw, 100px)',
        width: 'auto',
        pb:'5vmin',
        position:'absolute',
        transformOrigin:'center',
        boxSizing:'border-box',
        zIndex:50,
        visibility:y > 0.001 ? 'visible' : 'hidden',
        cursor:'pointer'
      }}>
      L
      <Letter
        val={'a'}
        z={26}
        out={85}
        back={33}
        />
      <Letter
        val={'u'}
        z={25}
        out={82}
        back={36}
        />
      <Letter
        val={'r'}
        z={24}
        out={79}
        back={39}
        />
      <Letter
        val={'e'}
        z={23}
        out={76}
        back={42}
        />
      <Letter
        val={'n'}
        z={22}
        out={73}
        back={45}
        />
      <span sx={{display:display}}> </span>
      <motion.span
        style={{
          transform:moveD
        }}
        sx={{
          display:'inline-block'
        }}>
        D
      </motion.span>
      <Letter
        val={'a'}
        z={26}
        out={85}
        back={30}
        />
      <Letter
        val={'v'}
        z={25}
        out={82}
        back={33}
        />
      <Letter
        val={'i'}
        z={24}
        out={79}
        back={36}
        />
      <Letter
        val={'d'}
        z={23}
        out={76}
        back={39}
        />
      <Letter
        val={'s'}
        z={22}
        out={73}
        back={42}
        />
      <Letter
        val={'o'}
        z={21}
        out={70}
        back={45}
        />
      <Letter
        val={'n'}
        z={20}
        out={67}
        back={48}
        />
    </motion.div>
    </>
  )
}

export default Name
