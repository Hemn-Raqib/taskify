import React, { useState } from 'react';
import './App.css';
import InputField from './components/inputField';
import { Todo } from './model';
import TodoList from './components/TodoList';



const App: React.FC = () => {
  const [todo, setTodo] = useState<string>(""); // single variable
  const [todos, setTodos] = useState<Todo[]>([]); // array


  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();

    if(todo){
      setTodos([...todos, {id: Date.now(), todo, isDone: false}]);

      setTodo("");
    }
  };



  return (
    <div className="App">
      <span className='heading'>Taskify</span>
      <InputField todo={todo} setTodo={setTodo} handleAdd={handleAdd} />

      <TodoList todos={todos} setTodos={setTodos}/>
    </div>
  );
}

export default App;
