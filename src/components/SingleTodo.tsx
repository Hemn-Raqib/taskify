import React, { useState, useRef, useEffect } from 'react'
import { Todo } from '../model'
import './styles.css'
import TodoList from './TodoList';

interface Props {
    todo: Todo
    todos: Todo[];
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>
}






const SingleTodo: React.FC<Props> = ({ todo, todos, setTodos }) => {

    const [edit, setEdit] = useState<boolean>(false);
    const [editTodo, setEditTodo] = useState<string>(todo?.todo);
    
    const handleDone = (id: number) => {
        setTodos(todos.map((todo) => todo.id === id ? {...todo, isDone: !todo.isDone} : todo ));
    }
    
    const handlDelete = (id: number) => {
        setTodos(todos.filter((todo) => todo.id !== id));
    }
    const handleEdit = (e:React.FormEvent<HTMLFormElement>, id: number) => {
        e.preventDefault();

        setTodos(todos.map((todo) => todo.id === id  ? {...todo, todo: editTodo} : todo));
        setEdit(false);
    }

    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        inputRef?.current?.focus();
    }, [edit])

    return (
    <form className='todos_single' onSubmit={(e) => handleEdit(e, todo?.id) }>
        
        {
            edit ? ( 
                <input 
                ref={inputRef}
                type='text' 
                className='todos__single--text' 
                value={editTodo}
                onChange={(e) => setEditTodo(e.target.value)}
                />
             ) : todo?.isDone ? (
                <s key={todo?.id} className='todos_single--text'>{todo?.todo}</s>
            ) : (
                <span key={todo?.id + 12} className='todos_single--text'>{todo?.todo}</span>
            )
        }

        

        <div>
            <span 
            className='icon' 
            onClick={() => {

                if(!edit && !todo?.isDone){
                  setEdit(!edit);
                }
            }
            }
                >🖊</span>

            <span className='icon' onClick={() => handlDelete(todo?.id)}>❌</span>
            <span className='icon' onClick={() => handleDone(todo?.id)}>✔</span>
        </div>
    </form>
  )
}

export default SingleTodo
