import React, { useRef, useState } from 'react'
import styled from 'styled-components'
import './DictionaryItem.css'

const Item = styled.div`
padding: 10px 15px;
box-shadow: 1px 1px 7px #000;
border-radius: 50px;
opacity: 1;
transition: all 1s ease-in-out;
`

const Button = styled.button`
padding: 7px;
width: 60px;
box-shadow: 1px 1px 7px #000;
border-radius: 50px;
cursor: pointer;
font-size: .7rem;
position: relative;

@media (min-width: 376px) {
  width: 100px;
  font-size: 1rem;
}
`;

const VolumeButton = styled.button`
padding: 10px;
width: 36px;
height: 36px;
box-shadow: 1px 1px 7px #000;
border-radius: 50%;
cursor: pointer;
font-size: .8rem;
`;

const CloseButton = styled.button`
  position: absolute;
  top: -15px;
  right: -15px;
  padding: 5px 7px;
  box-shadow: 1px 1px 7px #000;
  border-radius: 50%;
  cursor: pointer;
  background: transparent;
  color: #fff;
  font-size: .5rem;

  @media (min-width: 600px) {
    font-size: 0.7rem;
  }
`;

const Definition = styled.p`
text-align: center;
`

const DictionaryItem = ({ definition, id, src, translation, word, removeItem }) => {

  const [isSrc, setIsSrc] = useState(true)
  const [show, setShow] = useState(false)
  const audioRef = useRef()
  const itemRef = useRef()
  const delBtnRef = useRef()


  const deleteItem = (e) => {
    itemRef.current.classList.add('fade-away');
  }
  /* 

  const remove = (e) => {
    deleteItem()
    setTimeout(() => {
      removeItem(e.target.getAttribute('data-id'))
    }, 800)
  }*/

 /* const remove = (e) => {
    removeItem(e.target.getAttribute('data-id'))
  }*/

  const remove = () => {
    const id = delBtnRef.current.getAttribute('data-id')
    console.log(id)
    removeItem(id)
 
    //setCategories(categories.filter(prevCategory => prevCategory !== folderForDelete))
}


  //play
  const playAudio = () => {
    if (src !== "") {
      audioRef.current.play()
      setIsSrc(true)
    } else {
      setIsSrc(false)
    }
  }




  return (

    <Item ref={itemRef} className='item' >
      <audio ref={audioRef} src={src} id="sound"></audio>
      <div className='flex-container'>
        <p style={{ textTransform: "capitalize" }}>{word}</p>
        <Button onClick={() => setShow(!show)}>
          {show ? translation : "Fordítás"} <CloseButton ><i className={show ? "fa-solid fa-folder-closed" : "fa-solid fa-folder-open"}></i></CloseButton>
        </Button>
        <VolumeButton onClick={playAudio}>{!isSrc ? <i class="fa-solid fa-microphone-slash"></i> : <i className="fa-solid fa-volume-high"></i>}</VolumeButton>
        <VolumeButton ref={delBtnRef} onClick={remove} data-id={id}><i className="fa-solid fa-calendar-xmark"></i></VolumeButton>
      </div>
      {show &&
        <Definition className='fade-in-container'>{definition}</Definition>
      }
    </Item>
  )
}

export default DictionaryItem
