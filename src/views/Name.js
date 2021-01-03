/** @jsxImportSource theme-ui */
import React from 'react'


const Name = ({horizontal}) => {
  return(
    <div sx={{
      fontSize:'9vmin',
      fontFamily:'heading',
      color:'Teal1', textAlign:'right',
      marginX:'2vmin',
      gridArea:'name',
      justifySelf:'end',
      alignSelf:'end',
      lineHeight:'9vmin',
      width: horizontal ? '100%' : '50%'
    }}>
      Lauren Davidson
    </div>
  )
}

export default Name
