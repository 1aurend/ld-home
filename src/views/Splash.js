/** @jsxImportSource @emotion/react */
import React from 'react'
import { jsx } from '@emotion/react'
import testPng from '../assets/text.png'

const Splash = () => {
  return(
    <div
      css={{height:'100%',width:'100%',backgroundImage:`url(${testPng})`}}
    >
      STUFF
    </div>
  )

}

export default Splash
