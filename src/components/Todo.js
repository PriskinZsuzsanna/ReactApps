import React from 'react'
import { useRef } from 'react'
import styled from 'styled-components'

const TodoDiv = styled.div`
width: 100%;
padding: 7px 15px;
background: transparent;
box-shadow: 1px 1px 7px #000;
border-radius: 50px;
font-size: 14px;
display: flex;
justify-content: space-between;
align-items: center;
font-weight: 600;
`


const Todo = ({ todo, id, removeTodo }) => {
    const todoRef = useRef()
    const buttonRef = useRef()

    const deleteTodo = (e) => {
        todoRef.current.classList.add('fade-away');
    }

    const remove = (e) => {
        deleteTodo()
        setTimeout(() => {
            removeTodo(buttonRef.current.getAttribute('data-id'))
        }, 1000)
    }

    return (
        <TodoDiv ref={todoRef} className='todo fade-in-container'>
            <p>{todo}</p>
            <button ref={buttonRef} onClick={remove} data-id={id}><i className="fa-solid fa-trash-can-arrow-up"></i></button>
        </TodoDiv>
    )
}

export default Todo
