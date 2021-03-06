/** @jsxImportSource theme-ui */
import { useContext } from 'react'
import {
  motion,
  useMotionTemplate
} from 'framer-motion'
import useScrub from '../../hooks/use-scrub'
import { Y } from '../Controller'

const Name = () => {
  const y = useContext(Y)

  const kfs = {
    0: '0vh',
    2: '-60vh',
    99: '-60vh',
    100: '-20vh'
  }
  const top = useScrub(kfs, y)
  const translate = useMotionTemplate`translateY(${top})`

  return(
    <motion.div
      style={{transform:translate}}
      sx={{
        fontSize:'10vmin',
        fontFamily:'heading',
        color:'Teal2',
        textAlign:'right',
        gridArea:'name',
        justifySelf:'center',
        alignSelf:'center',
        lineHeight:'10vmin',
        width: 'auto',
        pb:'5vmin',
      }}>
      Lauren Davidson
    </motion.div>
  )
}

export default Name
