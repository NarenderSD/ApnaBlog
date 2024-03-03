import React from 'react'
import logo from "../assets/logo.png"

function Logo({width = '100px'}) {
  return (
    <div className='w-full'>
      <img className='w-20 h-12 object-contain mix-blend-multiply' src={logo} alt="Logo" />
    </div>
  )
}

export default Logo