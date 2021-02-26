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
    1: '0vh',
    5: '-60vh',
    96: '-60vh',
    100: '-20vh'
  }
  const top = useScrub(kfs, y)
  const translate = useMotionTemplate`translateY(${top})`

  return(
    <motion.div
      style={{transform:translate}}
      sx={{
        fontSize:'9vmin',
        fontFamily:'heading',
        color:'Teal1', textAlign:'right',
        gridArea:'name',
        justifySelf:'center',
        alignSelf:'center',
        lineHeight:'9vmin',
        width: 'auto',
        pb:'5vmin',
      }}>
      Lauren Davidson
    </motion.div>
  )
}

export default Name