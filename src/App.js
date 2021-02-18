//import logo from './logo.svg';
import React, { useState, useRef, useEffect } from 'react';
import TodoList from './components/TodoList';
import { v4 as uuidv4 } from 'uuid';

var date = new Date();


const LOCAL_STORAGE_KEY = 'todoApp.todos'

function App() {
  const [todos, setTodos] = useState([])
  const todoNameRef = useRef()

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    if (storedTodos) setTodos(storedTodos)
  }, [])

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
  }, [todos])

  function toggleTodo(id) {
    const newTodos = [...todos]
    const todo = newTodos.find(todo => todo.id === id)
    todo.complete = !todo.complete
    setTodos(newTodos)
  }

  function handleAddTodo(e) {
    const name = todoNameRef.current.value
    if (name === '') return
    setTodos(prevTodos => {
      return [...prevTodos, { id: uuidv4(), name: name, complete: false}]
    })
    todoNameRef.current.value = null
  }

  function handleClearTodos() {
    const newTodos = todos.filter(todo => !todo.complete)
    setTodos(newTodos)
  }

  return (
    <>
      <div class="container" >
        <p>{date.toDateString()}</p>
        <h2>My Todo List</h2>
        <div class="todo_btn_container">
          <input ref={todoNameRef} type="text" />
          <button class="btn btn-primary" onClick={handleAddTodo}>Add Todo</button>
          <button class="btn btn-danger" onClick={handleClearTodos}>Clear Complete</button>
        </div>
        <div>{todos.filter(todo => !todo.complete).length} left to do</div>
        <TodoList todos={todos} toggleTodo={toggleTodo} />
      </div>

    </>
  )
}

export default App;