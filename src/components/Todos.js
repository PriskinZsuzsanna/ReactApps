import { useEffect, useState } from 'react'
import Todo from './Todo';
import useLocalStorage from "../hooks/useLocalStorage"
import styled from 'styled-components';

const DivMarginTop = styled.div`
margin-top: 10px;
`


const Todos = () => {

  //Todos

  const [todoInput, setTodoInput] = useState("");
  const [todoList, setTodoList] = useLocalStorage("todoList", [])


  const saveTodo = () => {

    setTodoList([...todoList, {
      todo: todoInput,
      id: Math.floor(Math.random() * 10000)
    }])

  }

  const removeTodo = (id) => {

    todoList.forEach((todo, index) => {
      if (todo.id === +id) {
        todoList.splice(index, 1)
      }
    });

    localStorage.setItem("todoList", JSON.stringify(todoList));
  }

  return (
    <div className="todolist block-container">
      <h3>Milyen terveid vannak mára?</h3>
      <input type="text" placeholder='Feladat...' value={todoInput}
        onChange={(e) => {
          setTodoInput(e.target.value);
        }}
        onKeyUp={(e) => {
          if (e.keyCode == "13") {
            saveTodo()
            setTodoInput("")
          }
        }}
      />
      <DivMarginTop className="todos block-container">
        {
          todoList.map(todo => {
            return (
              <Todo
                todo={todo.todo}
                id={todo.id}
                key={todo.id}
                removeTodo={removeTodo}
              />
            )
          })
        }
      </DivMarginTop>

    </div>
  )
}

export default Todos

