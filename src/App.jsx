import { useState, useEffect } from 'react'
import axios from 'axios'
import TodoList from './components/TodoList'
import AddTodoForm from './components/AddTodoForm'
import './App.css'

function App() {
  const [todos, setTodos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/todos?_limit=10')
        setTodos(response.data)
        setLoading(false)
      } catch (err) {
        setError('Failed to fetch todos')
        setLoading(false)
      }
    }
    fetchTodos()
  }, [])

  const addTodo = async (title) => {
    try {
      const response = await axios.post('https://jsonplaceholder.typicode.com/todos', {
        title,
        completed: false,
        userId: 1
      })
      setTodos([response.data, ...todos])
    } catch (err) {
      setError('Failed to add todo')
    }
  }

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`)
      setTodos(todos.filter(todo => todo.id !== id))
    } catch (err) {
      setError('Failed to delete todo')
    }
  }

  const toggleTodo = async (id) => {
    try {
      const todo = todos.find(t => t.id === id)
      const updatedTodo = { ...todo, completed: !todo.completed }
      await axios.put(`https://jsonplaceholder.typicode.com/todos/${id}`, updatedTodo)
      setTodos(todos.map(t => t.id === id ? updatedTodo : t))
    } catch (err) {
      setError('Failed to update todo')
    }
  }

  return (
    <div className="app-container">
      <div className="todo-app">
        <h1 className="app-title">Todo App</h1>
        {loading && <p className="loading">Loading...</p>}
        {error && <p className="error">{error}</p>}
        <AddTodoForm onAdd={addTodo} />
        <TodoList todos={todos} onDelete={deleteTodo} onToggle={toggleTodo} />
      </div>
    </div>
  )
}

export default App;