/* eslint-disable no-undef */
import React, { useEffect, useState } from 'react';
import './TodoForm.css';
import { FaEdit, FaTrash } from 'react-icons/fa';


function TodoForm() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [todos, setTodos] = useState([]);
  
  const [isEdit, setIsEdit] = useState(false);
  const [editingTodoId, setEditingTodoId] = useState(null);

  useEffect(() => {
    // Define an async function inside useEffect
    const fetchTodos = async () => {
      try {
        const todosResponse = await fetch('http://localhost:4000/todos');
        const todos = await todosResponse.json();
        setTodos(todos);
      } catch (error) {
        console.error('Error fetching todos:', error);
      }
    };

    // Call the async function
    fetchTodos();
  }, []); // Empty dependency array ensures this runs only once

  async function saveTodoToDB(todo, todoId) {
    try {
      const url = isEdit 
        ? `http://localhost:4000/todos/${todoId}` 
        : 'http://localhost:4000/todos';

      const response = await fetch(url, {
        method: isEdit ? 'PATCH' : 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(todo)
      });
      
      console.log('Success:', response);
    } catch (error) {
      console.error('Error:', error);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedTodo = { title, description };

    // add this todo to db
    await saveTodoToDB(updatedTodo);


    if (isEdit) {
      setTodos(
        todos.map(todo => todo._id !== editingTodoId ? todo : { ...todo, ...updatedTodo })
      );
      setIsEdit(false);
    } else {
      setTodos([...todos, updatedTodo]);
    }

    setTitle('');
    setDescription('');
  };

  async function handleDelete(todoId) {
    const response = await fetch(`http://localhost:4000/todos/${todoId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    console.log(response);

    setTodos(todos.filter(todo => todo._id !== todoId));
  }

  function handleEditClick(todoId) {
    setIsEdit(true);
    setEditingTodoId(todoId);
    const editingTodo = todos.find(todo => todo._id === todoId);
    setTitle(editingTodo.title);
    setDescription(editingTodo.description);
  }

  function cancelUpdate() {
    setIsEdit(false);
    setTitle('');
    setDescription('');
  }

  return (
    <div className='row'>
      <div className='col col-md-5 todo-form'>
        <div className="form-container">
          <h3>Add Todo</h3>
          <br></br>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="title">Title:</label>
              <input
                type="text"
                id="title"
                name="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                placeholder='Enter Title'
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Description:</label>
              <textarea
                id="description"
                name="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                placeholder='Enter description'
              ></textarea>
            </div>
            <div className="form-group">
              <button type="submit" className='btn btn-primary'> 
                {isEdit ? 'Update Todo' : 'Add Todo'}
              </button>
              {
                isEdit 
                 && 
                <button 
                  type="submit" 
                  className='btn btn-danger cancelButton' 
                  onClick={()=>{cancelUpdate();}}> 
                    Cancel Update 
                </button> }
            </div>
            
            
          </form>
        </div>
      </div>
      <div className='col col-md-7 todo-list'>
        {/* <div className="todo-list"> */}
        <h2>Todo List</h2>
        {todos.map((todo, _) => (
          <div key={todo._id} className="todo-item">
            <span className='title'>
              {todo.title}
            </span>
            <br />
            <span className='description'>
              <p>{todo.description}</p>
            </span>

            <span className='trashButton' onClick={()=> { handleDelete(todo._id); }}>
              <FaTrash />
            </span>
            
            <span className='editButton' onClick={()=> { handleEditClick(todo._id); }}>
              <FaEdit />
            </span>
          </div>
        ))}
        {/* </div> */}

      </div>
    </div>
  );
}


export default TodoForm;