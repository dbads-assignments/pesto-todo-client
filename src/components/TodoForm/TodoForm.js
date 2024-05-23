import React, { useState } from 'react';
import './TodoForm.css';

function TodoForm() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [todos, setTodos] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newTodo = { title, description };
    setTodos([...todos, newTodo]);

    setTitle('');
    setDescription('');
  };

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
        {todos.map((todo, index) => (
          <div key={index} className="todo-item">
            <span className='title'>
              {todo.title}
            </span>
            <br />
            <span className='description'>
              <p>{todo.description}</p>
            </span>
          </div>
        ))}
        {/* </div> */}

      </div>
    </div>
  );
}


export default TodoForm;