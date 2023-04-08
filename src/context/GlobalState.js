import React, { useContext, useState, useEffect } from 'react'
import useLocalStorage from "../hooks/useLocalStorage"

export const GlobalContext = React.createContext()

export const uncategorizedId = "Kategorizálatlan"

export function useGlobal() {
  return useContext(GlobalContext)
}

export const GlobalProvider = ({ children }) => {


  //TIME--------------------------------------------------
  let time = new Date().toLocaleTimeString();
  let hour = new Date().getHours();

  const [currentTime, setCurrentTime] = useState(time);
  const [currentHour, setCurrentHour] = useState(hour);
  const [period, setPeriod] = useState("");


  const updateTime = () => {
    time = new Date().toLocaleTimeString();
    hour = new Date().getHours();
    setCurrentHour(hour)
    setCurrentTime(time)
    return currentTime
  }

  const getPeriod = () => {
    setPeriod("")
    document.body.className = ''
    if (parseInt(currentHour) < 10) {
      setPeriod("Jó reggelt")
      document.body.className = 'morning'
    } else if (parseInt(currentHour) < 18) {
      setPeriod("Szép napot")
      document.body.className = 'day'
    } else {
      setPeriod("Jó estét")
      document.body.className = 'night'
    }
  }

  //DATA-------------------------------------------------
  const [categories, setCategories] = useLocalStorage("categories", [])
  const [notes, setNotes] = useLocalStorage("notes", [])
  const [selectedNotes, setSelectedNotes] = useState([])
  const [clickedFolder, setClickedFolder] = useState("")
  const [chooseFolder, setChoosenFolder] = useState("")


 function getCategoryItems(id) {
      setClickedFolder(id)
      return notes.filter(note => note.select === id)
  }

  
  function addCategory({ category, id }) {
    //setEmptyStorage(false)
    setCategories(prevCategories => {
      if (prevCategories.find(category => category.category === category)) {
        return prevCategories
      }
      return [...prevCategories, { id, category }]
    })
  }

  function addNote({ title, text, id, select, categoryId }) {
    //setEmptyStorage(false)
    //setIsNotes(true)
    setNotes(prevNotes => {
      return [...prevNotes, { id, title, text, select, categoryId }]
    })

  }

  function deleteNote({ id }) {
    setNotes(prevNotes => {
      return prevNotes.filter(note => note.id !== id)
    })
  }

  function deleteCategory( id ) {
    setCategories(prevCategories => {
      return prevCategories.filter(category => category.id !== id)
    })
  }



  return (
    <GlobalContext.Provider
      value={{
        //background
        updateTime,
        getPeriod,
        period,
        currentHour,
        currentTime,
        time,
        hour,
        //Notes
        addCategory,
        categories,
        setCategories,
        addNote,
        notes,
        setNotes,
        uncategorizedId,
        getCategoryItems,
        selectedNotes,
        setSelectedNotes,
        deleteNote,
        deleteCategory
      }}>
      {children}
    </GlobalContext.Provider>)
}