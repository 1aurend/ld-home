/** @jsxImportSource theme-ui */
import {
  useContext,
  useRef,
  useLayoutEffect,
  useState
} from 'react'
import {
  motion,
  useMotionTemplate
} from 'framer-motion'
import useScrub from '../../hooks/use-scrub'
import { Y } from '../Controller'
import Letter from './Letter'
import scenes from '../../assets/sceneList'
import useScenes from '../../hooks/use-scenes'
import useSize from '../../hooks/use-debounced-window-size'


const Name = () => {
  const y = useContext(Y)
  const size = useSize()

  const name = useRef(null)
  const [hX, setHX] = useState()
  const [hY, setHY] = useState()
  useLayoutEffect(() => {
    if (name.current && y === 0) {
      const rect = name.current.getBoundingClientRect()
      setHX(rect.left)
      setHY(rect.top)
    }
  }, [size, y])


  const [relY, current] = useScenes(scenes, [1,7], y)

  const topKfs = {
    1: {
      0: `${hY || 0}px`,
      2: `${hY || 0}px`,
      44: `${size.height*0.05}px`,
      100: `${size.height*0.05}px`
    }
  }
  const top = useScrub(topKfs[current], relY)
  const leftKfs = {
    1: {
      0: `${hX || 0}px`,
      44: `${hX || 0}px`,
      95: `${size.width*0.05}px`,
      100: `${size.width*0.05}px`
    }
  }
  const left = useScrub(leftKfs[current], relY)

  const fontKfs = {
    1: {
      0: 1,
      22: 1,
      44: 0.5,
      100: 0.5
    },
    7: {
      0: 0.5,
      22: 0.5,
      44: 1
    }
  }
  const fontSize = useScrub(fontKfs[current], relY)
  const scale = useMotionTemplate`scale(${fontSize})`

  return(
    <motion.div
      id='name'
      ref={name}
      style={{
        transform:scale,
        left:y !== 0 ? left : '',
        top:y !== 0 ? top : '',
      }}
      sx={{
        fontFamily:'heading',
        fontSize:'10vmin',
        color:'Teal2',
        textAlign:'center',
        justifySelf:'center',
        alignSelf:'left',
        lineHeight:'10vmin',
        width: 'auto',
        pb:'5vmin',
        position:y !== 0 ? 'absolute' : '',
        transformOrigin:'center'
      }}>
      L
      <Letter
        val={'a'}
        z={205}
        out={62}
        back={50}
        />
      <Letter
        val={'u'}
        z={204}
        out={59}
        back={53}
        />
      <Letter
        val={'r'}
        z={203}
        out={56}
        back={56}
        />
      <Letter
        val={'e'}
        z={202}
        out={53}
        back={56}
        />
      <Letter val={'n'} z={201}
        out={50}
        back={62}
        />
      <span sx={{display:y>.0275 ? 'none' : ''}}> </span>
      D
      <Letter
        val={'a'}
        z={205}
        out={62}
        back={50}
        />
      <Letter
        val={'v'}
        z={204}
        out={59}
        back={53}
        />
      <Letter
        val={'i'}
        z={203}
        out={56}
        back={56}
        />
      <Letter
        val={'d'}
        z={202}
        out={53}
        back={56}
        />
      <Letter
        val={'s'}
        z={201}
        out={50}
        back={62}
        />
      <Letter
        val={'o'}
        z={203}
        out={47}
        back={65}
        />
      <Letter
        val={'n'}
        z={202}
        out={44}
        back={68}
        />
    </motion.div>
  )
}

export default Name
