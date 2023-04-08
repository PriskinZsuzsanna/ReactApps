import styled from 'styled-components';

import React, { useContext, useEffect, useState } from 'react'
import { GlobalContext } from '../context/GlobalState'
import NotesFolder from '../components/NotesFolder';
import AddCategoryModal from '../components/AddCategoryModal';
import AddNoteModal from '../components/AddNoteModal';
import UncategorizedFolder from '../components/UncategorizedFolder';
import NoteItems from '../components/NoteItems';

const HeaderText = styled.h2`
  text-align: center; 
  padding-block: 10px;
`;
const ButtonsDiv = styled.div`
  display: flex;
  gap: 10px
`;

const Button = styled.button`
  padding: 7px;
  width: 120px;
  box-shadow: 1px 1px 7px #000;
  border-radius: 50px;
  cursor: pointer;
`;



const Notes2 = () => {

  const { getPeriod, currentHour, categories, uncategorizedId, } = useContext(GlobalContext);
  const [showAddCategoryModal, setShowAddCategoryModal] = useState(false)
  const [showAddNoteModal, setShowAddNoteModal] = useState(false)
  const [showNoteItemModal, setShowNoteItemModal] = useState(false)
  const [isOpenNotes, setIsOpenNotes] = useState(false)

  const showAddCategory = () => {
    document.body.classList.toggle('filter')
    setShowAddCategoryModal(!showAddCategoryModal)
  }

  const showAddNote = () => {
    document.body.classList.toggle('filter')
    setShowAddNoteModal(!showAddNoteModal)
    setIsOpenNotes(false)
  }

  const showNotes = () => {
    //document.body.classList.toggle('filter')
    //setShowNoteItemModal(!showNoteItemModal)
    setIsOpenNotes(!isOpenNotes)
  }


  //Background
  useEffect(() => {
    getPeriod()
  }, [currentHour]) //period ?



  return (
    <>
      <div className='container  fade-in-container'>
        <div className="block-container">

          <HeaderText>Jegyzetek</HeaderText>
          <ButtonsDiv>
            <Button onClick={showAddCategory}>+ Kategória</Button>
            <Button onClick={showAddNote}>+ Jegyzet</Button>
          </ButtonsDiv>

          {!isOpenNotes &&
            <>
              {categories.map((category, idx) => (
                <NotesFolder
                  key={idx}
                  category={category.category}
                  showNotes={showNotes}

                />

              ))}


              <UncategorizedFolder
                key={"uncategorized"}
                category={uncategorizedId}
                showNotes={showNotes}
              />


            </>

          }

          {
            isOpenNotes &&

            <>
              <NoteItems
                showNotes={showNotes}
                isOpenNotes={isOpenNotes} />
            </>
          }
        </div>


      </div>
      {showAddCategoryModal &&
        <AddCategoryModal
          showAddCategory={showAddCategory}
        />
      }
      {showAddNoteModal &&
        <AddNoteModal
          showAddNote={showAddNote}
        />
      }
      {/*
        showNoteItemModal &&
        <NoteItemModal
          showNotes={showNotes}
           />
    */}
    </>
  )
}

export default Notes2

