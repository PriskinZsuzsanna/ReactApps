import React from 'react'
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import './Footer.css'

const Button = styled.button`
  padding: 5px;
  width: 90px;
  box-shadow: 1px 1px 7px  #000;
  border-radius: 50px;
  position:relative;

  @media (min-width: 376px) {
    font-size: 1rem;
    padding: 7px;
    width: 120px;
    
  }
`;



const Footer = () => {
  return (
    <footer className='container fade-in-container'>
    <nav>
      <ul>
        <Button><li><Link to="/">Home</Link></li></Button>
        <Button><li><Link to="/notes">Jegyzetek</Link></li></Button>
        <Button><li><Link to="/dictionary">Szótár</Link></li></Button>
      </ul>
    </nav>
  </footer>
  )
}

export default Footer
