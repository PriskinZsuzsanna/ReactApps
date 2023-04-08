import {useRef, useContext} from 'react'
import styled from 'styled-components'
import { GlobalContext } from '../context/GlobalState'

const Modal = styled.div`
  position: absolute;
  width: 80%;
  top: 50%;
  translate: 0 -50%;
  z-index: 1;
`
const Form = styled.form`
  padding-block: 50px;
  width: 100%;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  border-radius: 10px;
  background: #cbbfbf57;
  background: #000000bb;
  position: relative;
`
const Button = styled.button`
  padding: 7px 25px;
  box-shadow: 1px 1px 7px #ffffffaa;
  border-radius: 50px;
  cursor: pointer;
`;
const CloseButton = styled.button`
  padding: 7px 10px;
  box-shadow: 1px 1px 7px #ffffffaa;
  border-radius: 5px;
  cursor: pointer;
  position: absolute;
  top: 10px;
  right: 10px;
`;

const Input = styled.input`
box-shadow: 1px 1px 7px #ffffffaa;
border-radius: 5px
`
const Textarea = styled.textarea`
box-shadow: 1px 1px 7px #ffffffaa;
height: 240px;
`
const Select = styled.select`
box-shadow: 1px 1px 7px #ffffffaa;
`
const Option = styled.option`
background: #000000bb;
`

const AddNoteModal = ({showAddNote}) => {
  const titleRef = useRef()
  const textRef = useRef()
  const selectRef = useRef()
 //
  const {addNote, categories, uncategorizedId} = useContext(GlobalContext);

  function handleSubmit(e) {
    e.preventDefault()
    addNote({
      title: titleRef.current.value,
      text: textRef.current.value,
      select: selectRef.current.value,
      id: Math.floor(Math.random() * 10000)
    })
    showAddNote()
  }


  return (
    <Modal className='container fade-in-container'>
      <Form onSubmit={handleSubmit}>
        <CloseButton onClick={showAddNote}><i className="fa-solid fa-xmark"></i></CloseButton>
        <h3>Új Jegyzet</h3>
        <Input ref={titleRef} type="text" name='text' placeholder='Cím...' required/>
        <Textarea ref={textRef} required placeholder='Jegyzet...'/>
        <Select ref={selectRef}>
          <Option id={uncategorizedId} value={uncategorizedId}>Kategória választása</Option>
          {categories.map(category => (
            <Option key={category.id} value={category.id}>{category.category}</Option>
          ))}
        </Select>
        <Button type='submit'>Mentés</Button>
      </Form>
     
    </Modal>
  )
}

export default AddNoteModal
