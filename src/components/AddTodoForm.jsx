import { useState } from 'react'

function AddTodoForm({ onAdd }) {
  const [title, setTitle] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (title.trim()) {
      onAdd(title)
      setTitle('')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="add-todo-form">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Add a new todo"
        className="todo-input"
      />
      <button
        type="submit"
        className="add-button"
      >
        Add
      </button>
    </form>
  )
}

export default AddTodoForm