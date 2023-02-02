import { logDOM } from '@testing-library/react'
import React, {  useState,useEffect, useRef } from 'react'
import './style.css'
import styled from "styled-components";
import Gameover from '../Components/Gameover'
import WinPage from '../Components/WinPage'

const moves=2
let i=-28
const hero_height=10
let enemy_height=5
let enemy_width=7
const  bg_width=100
const hero_width=6
let end=0

let hero_collider
let enemy_collider
const bg=new URL('../Images/45798.png',import.meta.url)
const heroPhoto=new URL('../Images/hero.png',import.meta.url)
const enemy=new URL('../Images/props.png',import.meta.url)
const fruit=new URL('../Images/orange.png',import.meta.url)
let scoreIncr=0
function Bg({control,setControl}) {
 
  const hero_ref=useRef()
  const enemy_ref=useRef()
  const boxref=useRef()
  const [winner,setWinner]=useState(false)
  const [gameOver,setGameOver]=useState(false)
  const [heroPosition,setHeroPosition]=useState(5)
  const [enemyPosition,setEnemyPosition]=useState(0)
  const [bottomHeroPosition,setBottomHeroPosition]=useState(5)
  const [fruitPosition,setFruitPosition]=useState(15)
  const [score,setScore]=useState(scoreIncr)
  
  useEffect(() => {
    let timeLimit_Hero
    let timeLimit_enemy
    let villain=document.getElementById('villain')
    let playFruit=document.getElementById('playFruit')
    let score_board=document.getElementById('score_board')

    if(control){
    timeLimit_Hero=setInterval(() => {
      window.addEventListener('keydown',(btn)=>{
        switch(btn.key){
            case 'ArrowUp': 
                          setBottomHeroPosition(bottomHeroPosition+moves)
                          setHeroPosition(heroPosition+moves)
                          break;
            case 'ArrowRight': 
                          if(heroPosition<bg_width-7*hero_width ){
                              setHeroPosition(heroPosition+moves)
                            }
                          else {
                              setHeroPosition(bg_width-7*hero_width)
                          }
                          break;
            case 'ArrowLeft':
                          if(heroPosition>0 ){
                                setHeroPosition(heroPosition-moves)
                              }
                          else {
                                setHeroPosition(5)
                          }
                          break;
            case 'ArrowDown':
                          if(bottomHeroPosition>5){
                            setBottomHeroPosition(bottomHeroPosition-moves) 
                          }
                          else{
                            setBottomHeroPosition(5) 
                          }
                          break;              
         }
       })
    }, 24);
    
    if(enemyPosition<=bg_width-6*enemy_width && i<=0){
      timeLimit_enemy=setInterval(() => {
        setEnemyPosition(enemyPosition+moves)
        i++
      }, 500);
    }
    else {
      setEnemyPosition(bg_width-6*enemy_width)
    }
  }
    hero_collider={
      x:hero_ref.current.offsetLeft-hero_ref.current.scrollLeft,
      y:hero_ref.current.offsetTop-hero_ref.current.scrollTop,
      width:hero_ref.current.offsetWidth,
      height:hero_ref.current.offsetHeight
    }
      enemy_collider={
      x:villain.offsetLeft-villain.scrollLeft,
      y:villain.offsetTop-villain.scrollTop,
      width:villain.offsetWidth,
      height:villain.offsetHeight
      }
      if(hero_collider.x>villain.offsetWidth+villain.offsetLeft
        || enemy_collider.x>hero_ref.current.offsetWidth+hero_ref.current.offsetLeft
        || hero_collider.y>villain.offsetHeight+villain.offsetTop
        || enemy_collider.y>hero_ref.current.offsetHeight+hero_ref.current.offsetTop)
        {
          if((hero_collider.y>villain.offsetHeight+villain.offsetTop|| enemy_collider.y>hero_ref.current.offsetHeight+hero_ref.current.offsetTop) && hero_collider.x>villain.offsetWidth+villain.offsetLeft  && end<3){
            const EnemyRandomPos=Math.floor(Math.random()*10+Math.random()*10)
            setEnemyPosition(EnemyRandomPos)
            end++
          }
          if(hero_collider.y>playFruit.offsetHeight+playFruit.offsetTop ||hero_collider.x>playFruit.offsetWidth+playFruit.offsetLeft||(playFruit.offsetLeft-playFruit.scrollLeft )>hero_ref.current.offsetWidth+hero_ref.current.offsetLeft)
            {
              playFruit.style.visibility='visible'
            }
            else{
              if(scoreIncr<3)
              {  
                scoreIncr++
                console.log(scoreIncr)
              setScore(scoreIncr)
              const random=Math.floor(Math.random()*10+Math.random()*10)
              setFruitPosition(random)
              }
                if(scoreIncr===3){
                setWinner(true)
          hero_ref.current.style.visibility='hidden'
          enemy_ref.current.style.visibility='hidden'
          playFruit.style.visibility='hidden'
          score_board.style.visibility='hidden'
              }
            }
        }
        else{
          setGameOver(true)
          hero_ref.current.style.visibility='hidden'
          enemy_ref.current.style.visibility='hidden'
          playFruit.style.visibility='hidden'
          score_board.style.visibility='hidden'
        } 
        
    return () => {
      clearInterval(timeLimit_Hero)
      clearInterval(timeLimit_enemy)
    }

  },[heroPosition,enemyPosition,fruitPosition])
const enemy_style={
    position: 'absolute',
    right:enemyPosition+'rem' ,
    bottom:'5rem' ,
    height: enemy_height+'rem',
    width: enemy_width+'rem'
}
const container={
  display: 'flex',
}
const playFruit_style={
    position: 'absolute',
    left :fruitPosition+'rem' ,
    bottom:'5rem' ,
    height: '2rem',
    width: '2rem'
}
const scoreFruit_style={
  position: 'relative',
    left: '1rem',
    height: '4rem',
    width: '4rem'
}
  return( <>
  {winner && <WinPage></WinPage>}
  {gameOver && <Gameover></Gameover>}
  <div style={container} ref={boxref}>
    <Bgimg src={bg} bg_width={bg_width}/>
    <Hero src={heroPhoto} hero_width={hero_width} hero_height={hero_height} spaceFromBottom={bottomHeroPosition} spaceFromLeft={heroPosition}ref={hero_ref}/>
    <div id='score_board'>
    <img src={fruit} style={scoreFruit_style} id='scoreFruit' alt="" />
    <span>:</span>
    <h3>{score}</h3>
    </div>
    <img src={fruit} style={playFruit_style} id='playFruit' alt="" />
    <img src={enemy} style={enemy_style} id='villain' ref={enemy_ref}/>
  </div>
  </>)
}

export default Bg


const Bgimg=styled.img`
   /* z-index: 0; */
    overflow-y: hidden;
    width: ${(props)=>props.bg_width}vw;
    height: 100vh;
    background-position: center;
    background-size: cover;
    
`
const Hero=styled.img`
    transition: 1s;
    position: absolute;
    width: ${(props)=>props.hero_width}rem;
    height: ${(props)=>props.hero_height}rem;
    bottom: ${(props)=>props.spaceFromBottom}rem;
    left: ${(props)=>props.spaceFromLeft}rem;
`


