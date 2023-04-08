import { useRef, useContext } from 'react'
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
`

const AddCategoryModal = ({ showAddCategory }) => {

  const categoryRef = useRef()
  const { addCategory } = useContext(GlobalContext);

  function handleSubmit(e) {
    e.preventDefault()
    addCategory({
      category: categoryRef.current.value,
      id: categoryRef.current.value
    })
    showAddCategory()
  }


  return (
    <Modal className='container fade-in-container'>
      <Form onSubmit={handleSubmit}>
        <CloseButton onClick={showAddCategory}><i className="fa-solid fa-xmark"></i></CloseButton>
        <h3>Új kategória</h3>
        <Input ref={categoryRef} type="text" placeholder='Munka...' required  />
        <Button type='submit'>Mentés</Button>
      </Form>

    </Modal>
  )
}

export default AddCategoryModal
