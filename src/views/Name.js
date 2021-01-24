/** @jsxImportSource theme-ui */
import React from 'react'

const Name = ({ yPos }) => {
  return(
    <div sx={{
      fontSize:'9vmin',
      fontFamily:'heading',
      color:'Teal1', textAlign:'right',
      gridArea:'name',
      justifySelf:'center',
      alignSelf:'center',
      lineHeight:'9vmin',
      width: 'auto',
      pb:'5vmin',
      transform: `translateY(${-yPos}px)`,
    }}>
      Lauren Davidson
    </div>
  )
}

export default Name
