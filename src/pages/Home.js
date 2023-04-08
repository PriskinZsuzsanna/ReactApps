import {useState, useEffect, useContext} from 'react'
import { useParams } from 'react-router-dom'
import { GlobalContext } from '../context/GlobalState'
import Greeting from '../components/Greeting';
import Time from '../components/Time';
import Todos from '../components/Todos';
import styled from 'styled-components';

const HomeDiv = styled.div`
flex-direction: column;
gap: 20px;
`


const Home = () => {
  let {username} = useParams()
  const { updateTime, getPeriod, period, currentHour, currentTime} = useContext(GlobalContext)

  //Time
  
  setInterval(updateTime, 1000)

  //Greeting

  useEffect(() => {
    getPeriod()
  }, [currentHour])


  return (
    <HomeDiv className='container fade-in-container'>
       <Time
          currentTime={currentTime}
        />
        <Greeting
          period={period}
          username={username}
        />
        <Todos/>
    </HomeDiv>
  )
}

export default Home
