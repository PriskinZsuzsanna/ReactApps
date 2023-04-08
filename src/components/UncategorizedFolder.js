import React from 'react'
import { useGlobal, uncategorizedId } from '../context/GlobalState';
import NotesFolder from './NotesFolder';

export default function UncategorizedFolder({ category, setFolders, setItems, folders, items, getCategoryItems, selectedNotes,setSelectedNotes, isNotes, showNoteModal, showNotes }) {
    const { uncategorizedId } = useGlobal()
    
  
    return <NotesFolder key={"uncategorized"}
    category={uncategorizedId}
  
    getCategoryItems={getCategoryItems}
    selectedNotes={selectedNotes}
    setSelectedNotes={setSelectedNotes}
   
    showNoteModal={showNoteModal}
    
    showNotes={showNotes}/>
  }