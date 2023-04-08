import React, { useContext, useState, useRef } from 'react'
import styled from 'styled-components'
import { GlobalContext } from '../context/GlobalState'

const Button = styled.button`
  padding: 7px 25px;
  box-shadow: 1px 1px 7px #000;
  border-radius: 50px;
  cursor: pointer;
  color: #00000066;
  color: #fff;
`;

const CloseButton = styled.button`
  padding: 7px 20px;
  box-shadow: 1px 1px 10px #000;
  border-radius: 50px;
  cursor: pointer;
  background: transparent;
  color: #fff;
`;

const Notes = styled.div`
padding-block: 30px;
width: 100%;
max-width: 600px;
display: flex;
flex-direction: column;
align-items: center;
justify-content: space-between;
gap: 20px;
`
const Note = styled.div`
width: 100%;
display: flex;
align-items: center;
justify-content: space-between;
gap: 20px;
`


const NoteItems = ({ showNotes }) => {
    const { selectedNotes, deleteNote, selectedFolder } = useContext(GlobalContext);

    const [currentItems, setCurrentItems] = useState(selectedNotes)

    const modalRef = useRef()

    return (
        <Notes ref={modalRef} id={selectedFolder} className='fade-in-container block-container'>

            <CloseButton onClick={showNotes}>Kategóriák <i class="fa-solid fa-rotate-left" style={{marginLeft:10}}></i></CloseButton>
            {currentItems.map(note => {
                return (
                    <Note key={note.id} className='flex-container'>
                        <div>
                            <h4>{note.title}</h4>
                            <p>{note.text}</p>
                        </div>
                        <Button onClick={() => {
                            deleteNote(note)
                            setCurrentItems(currentItems.filter(item => item !== note))
                            console.log(currentItems)
                        }}>Törlés</Button>
                    </Note>
                )

            })
            }
            <p className={currentItems.length > 0 ? 'hide' : 'show'}>Ebben a kategóriában a jegyzetek végére értél.</p>


        </Notes>
    )
}

export default NoteItems
