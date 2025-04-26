import React from 'react';

function TodoItem({ todo, onDelete, onToggle }) {
  return (
    <li className="todo-item">
      <div className="todo-content">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo.id)}
          className="todo-checkbox"
        />
        <span className={todo.completed ? 'todo-title completed' : 'todo-title'}>
          {todo.title}
        </span>
      </div>
      <button
        onClick={() => onDelete(todo.id)}
        className="delete-button"
      >
        Delete
      </button>
    </li>
  )
}

export default TodoItem;