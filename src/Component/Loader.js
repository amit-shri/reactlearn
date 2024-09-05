import React from 'react'
import loading from './Loading.gif'

export default function Loader() {
  return (
    <div style={{"textAlign":"center"}}>
        <img src={loading} alt="Loading" />
    </div>
  )
}
