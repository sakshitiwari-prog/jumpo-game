import React,{useState,useEffect} from 'react'
import { useRef } from 'react'
import Bg from '../Components/Bg'
import HomeStyle from '../Components/HomeStyle.css'
function Home() {
  const playBtnref=useRef()
    const [control,setControl]=useState(false)
    const playHandler=()=>{
        setControl(true)
    }
  return ( <>
  {control && <Bg control={control} setControl={setControl}></Bg>}
  <div className='container'>
        <button type='button' id='play-btn' ref={playBtnref} onClick={playHandler} >Play</button>
    </div>
  </>   
  )
  }
export default Home