import React from 'react'
import Home from '../Components/Home'
import { useState } from 'react';

function WinPage() {
    const [home,setHome]=useState(false)
    function BackToHome(){
      setHome(true)
    }
    return (
      <>
        {home && <Home></Home>}
        
        <div className="container">
        <h1>Winner</h1>
        <button id='BackToHomeBtn' onClick={BackToHome}>Home</button>
        </div>
      </>)
}

export default WinPage