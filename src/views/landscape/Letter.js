/** @jsxImportSource theme-ui */
import { useContext } from 'react'
import {
  motion,
  useMotionTemplate
} from 'framer-motion'
import useScrub from '../../hooks/use-scrub'
import { Y } from '../Controller'
import scenes from '../../assets/sceneList'
import useScenes from '../../hooks/use-scenes'


const Letter = (props) => {
  const {
    val,
    z,
    out,
    back
  } = props
  const y = useContext(Y)

  const movekfs = {
    1: {
      0:'0vw',
      [out]:'0vw',
      [out+5]:'-3vw'
    },
    2: {
      0:'-3vw',
      100:'-3vw'
    },
    7: {
      0:'2vw',
      [back]:'2vw',
      [back+5]:'0vw'
    }
  }
  const opacitykfs = {
    1: {
      0:1,
      [out]:1,
      [out+5]:0
    },
    7: {
      0:0,
      [back]:0,
      [back+5]:1
    }
  }
  const [relY, current] = useScenes(scenes, [1,7], y)
  const x = useScrub(movekfs[current], relY)
  const translate = useMotionTemplate`translateX(${x})`
  const opacity = useScrub(opacitykfs[current], relY)
  const display = (current === 1 && relY*100 >= out+4) || (current === 7 && relY*100 < back)
    ? 'none'
    : 'inline-block'

  return (
    <motion.span
      style={{
        transform:translate,
        opacity:opacity
      }}
      sx={{
        zIndex:z,
        display:display
      }}>
      {val}
    </motion.span>
  )
}

export default Letter
