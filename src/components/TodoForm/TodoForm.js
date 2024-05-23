import React, { useEffect, useState } from 'react';
import './TodoForm.css';
import { FaBeer, FaCross, FaTrash } from 'react-icons/fa';


function TodoForm() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [todos, setTodos] = useState([]);

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

  async function saveTodoToDB(todo) {
    try {
      const response = await fetch('http://localhost:4000/todos', {
        method: 'POST',
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

    const newTodo = { title, description };

    // add this todo to db
    await saveTodoToDB(newTodo);

    setTodos([...todos, newTodo]);

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
              <button type="submit">Add Todo</button>
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
          </div>
        ))}
        {/* </div> */}

      </div>
    </div>
  );
}


export default TodoForm;