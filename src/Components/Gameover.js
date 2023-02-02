import React from 'react'
import { useState } from 'react'
import Home from '../Components/Home'

import GameoverStyle from '../Components/GameoverStyle.css'

function Gameover() {
  const [home,setHome]=useState(false)
  function BackToHome(){
    setHome(true)
  }
  return (
    <>
      {home && <Home></Home>}
      <div className="container">
      <button id='BackToHomeBtn' onClick={BackToHome}>Home</button>
      </div>
    </>
  )
}

export default Gameover