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
      justifySelf:'center',
      alignSelf:'center',
      lineHeight:'9vmin',
      width: 'auto',
      pb:'10vmin'
    }}>
      Lauren Davidson
    </div>
  )
}

export default Name
