import React from 'react'
import styled from 'styled-components';

const GreetingContainer = styled.div`
text-align: center;
`;


const Greeting = ({ period, username }) => {

   return (
      <GreetingContainer>
         {username ? <h1>{period}, {username}!</h1> : <h1>{period} !</h1>}
      </GreetingContainer>
   )

}

export default Greeting
