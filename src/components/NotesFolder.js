import React from 'react'
import { useRef, useContext, useState } from 'react';
import { GlobalContext } from '../context/GlobalState'
import styled from 'styled-components';


const ButtonsDiv = styled.div`
display: flex;
flex-wrap: wrap;
gap: 5px;
@media (min-width: 376px) {
    gap: 10px;
}
`;

const Button = styled.button`
padding: 7px 15px;
box-shadow: 1px 1px 7px #000;
border-radius: 50px;
cursor: pointer;


`;




const NotesFolder = ({ category, showNotes }) => {

    const { setSelectedNotes, getCategoryItems, deleteCategory, categories, setCategories } = useContext(GlobalContext);
    const buttonRef = useRef()
    const deleteButtonRef = useRef()

    const handleViewChange = () => {
        const selectedFolder = buttonRef.current.value
        showNotes()
        setSelectedNotes(getCategoryItems(selectedFolder))
    }

    
    const deleteFolder = () => {
        const folderForDelete = deleteButtonRef.current.value 
        console.log(folderForDelete)
        deleteCategory(folderForDelete)
        //setCategories(categories.filter(prevCategory => prevCategory !== folderForDelete))
    }


    return (
        <>
            <div className='flex-container fade-in-container' style={{flexWrap:'wrap'}}>
                <h4>{category}</h4>
                <ButtonsDiv>
                    <Button ref={buttonRef} value={category} onClick={handleViewChange}>Jegyzetek</Button>
                    <Button ref={deleteButtonRef} value={category} onClick={deleteFolder}>Delete</Button>
                </ButtonsDiv>
            </div>
        </>
    )

}

export default NotesFolder
