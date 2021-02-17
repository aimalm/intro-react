//import logo from './logo.svg';
import React, { useState, useRef } from 'react';
import TodoList from './components/TodoList';
import { v4 as uuidv4 } from 'uuid';

import './App.css';

function App() {
  const [todos, setTodos] = useState([])
  const todoNameRef = useRef();

  function handleAddTodo(e){
    const name = todoNameRef.current.value
    
    if(name === '') return
      setTodos(prevTodos => {
        return [...prevTodos, {id:uuidv4(), name: name, complete: false}]
      })
      todoNameRef.current.value = null
    
  

  }
  return (
    <>
      <TodoList todos={todos} />

      
      <input type="text" ref={todoNameRef}></input>
      <button onClick = {handleAddTodo}>Add Todo</button>
      <button>Clear Todo</button>
      <div> 0 left to do</div>

    </>
  );
}

export default App;
