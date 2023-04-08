import React from 'react'
import spinner from '../img/spinner.gif'

const Spinnner = () => {
  return (
    <img src={spinner} style={{width: '40%', maxWidth: '160px', margin: 'auto', display: 'block'}} alt="Loading" />
  )
}

export default Spinnner
