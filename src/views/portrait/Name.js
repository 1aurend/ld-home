/** @jsxImportSource theme-ui */
import React from 'react'
import {
  motion,
  useMotionValue,
  useMotionTemplate
} from 'framer-motion'


const Name = ({ yPercent }) => {

  return(
    <motion.div
      sx={{
        fontSize:'15vmin',
        fontFamily:'heading',
        color:'Teal1',
        textAlign:'right',
        alignSelf:'center',
        lineHeight:'12vmin',
        width: 'auto',
        pb:'5vmin',
        display:'flex',
        flexDirection:'column',
        justifyContent:'flex-start'
      }}>
        <div>
          Lauren
        </div>
          Davidson
        <div>
        </div>
    </motion.div>
  )
}

export default Name
