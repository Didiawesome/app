import React, { useEffect, useState } from 'react'
import TodoForm from './TodoForm'
import EditTodoForm from './EditTodoForm'
import CompletedTodo from './CompletedTodo'
import TodoCompleted from './TodoCompleted'
import DeletedTodo from './DeletedTodo'
import Todo from './Todo'
import cancel from '../img/cancel.png'
import trash from '../img/trash.png'
import check from '../img/check.png'
import back from '../img/back.png'
import { v4 as uuidv4 } from 'uuid'
uuidv4()

const TodoWrapper = () => {
  const [todos, setTodos] = useState([])
  const [completedTodos, setCompletedTodos] = useState([])
  const [deletedTodos, setDeletedTodos] = useState([])
  const [showCompletedTodos, setShowCompletedTodos] = useState(false)
  const [showDeletedTodos, setShowDeletedTodos] = useState(false)
  const [counter, setCounter] = useState(0)

  // const ofnik = JSON.parse(localStorage.getItem('todos')) || todos

  const clearFunc = () => {
    if (showCompletedTodos === true) {
      todos.map((todo) => todo.completed = false)
      setCompletedTodos([])
      localStorage.removeItem('completedTodos')
    } else if (showDeletedTodos === true) {
      setDeletedTodos([])
      localStorage.removeItem('deletedTodos')
    } else {
      setTodos([])
      localStorage.removeItem('todos')
    }
    setCounter(0)
  }

  const showCompletedTodosFunc = () => {
    setShowCompletedTodos(!showCompletedTodos)
    setShowDeletedTodos(false)
  }

  const showDeletedTodosFunc = () => {
    setShowDeletedTodos(!showDeletedTodos)
    setShowCompletedTodos(false)
  }

  const addTodo = (todo) => {
    setTodos([
      ...todos,
      { id: uuidv4(), task: todo, completed: false, isEditing: false },
    ])
    // localStorage.setItem('todos', JSON.stringify([...todos, { id: uuidv4(), task: todo, completed: false, isEditing: false }]))
  }

  useEffect(() => {
    if (completedTodos.length === 0) return
    localStorage.setItem('completedTodos', JSON.stringify(completedTodos))
  }, [completedTodos])

  useEffect(() => {
    if (deletedTodos.length === 0) return
    localStorage.setItem('deletedTodos', JSON.stringify(deletedTodos))
  }, [deletedTodos])

  useEffect(() => {
    if (todos.length === 0) return
    localStorage.setItem('todos', JSON.stringify(todos))
  }, [todos])

  useEffect(() => {
    const todosData = JSON.parse(localStorage.getItem('todos'))
    if (todosData !== null) setTodos(todosData)
  }, [])

  useEffect(() => {
    const compTodosData = JSON.parse(localStorage.getItem('completedTodos'))
    if (compTodosData !== null) setCompletedTodos(compTodosData)
  }, [])

  useEffect(() => {
    const delTodosData = JSON.parse(localStorage.getItem('deletedTodos'))
    if (delTodosData !== null) setDeletedTodos(delTodosData)
  }, [])

  // const saveTodos = () => {
  //   localStorage.setItem('todos', JSON.stringify(todos))
  // }

  const toggleComplete = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    )
    todos.map((todo) =>
      todo.id === id ? setCompletedTodos([...completedTodos, todo]) : ''
    )
    setCounter(counter + 1)
  }

  const toggleCompleted = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    )
    todos.map((todo) =>
      todo.id === id
        ? setCompletedTodos(completedTodos.filter((todo) => todo.id !== id))
        : ''
    )
    setCounter(counter - 1)
  }

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id))
    setDeletedTodos([
      ...deletedTodos,
      ...todos.filter((todo) => todo.id === id),
    ])

    console.log(deletedTodos)
  }

  const editTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isEditing: !todo.isEditing } : todo
      )
    )
  }

  const editTask = (task, id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, task, isEditing: !todo.isEditing } : todo
      )
    )
  }

  return (
    <div className="wrapper">
      <div className="content">
        <div className="header">
          {counter !== 0 ? counter === todos.length ? (
            <h1 className="title">Good job!🎉👍</h1>
          ) : (
            <h1 className="title">
              {counter > 0 ? 'Keep it going💪📈' : 'Do at least one🤏🙏'}
            </h1>
          ) : <h1 className='title'>Get Things Done!</h1>}
          <p>
            {counter}/{todos.length}
          </p>
          <TodoForm addTodo={addTodo} />
        </div>
        <div className="main">
          {showCompletedTodos ? (
            <div
              className={`${
                completedTodos.length < 5 ? 'compndeltodos' : 'compndeltodoss'
              }`}
            >
              {completedTodos.map((todo) => (
                <CompletedTodo task={todo} />
              ))}
            </div>
          ) : showDeletedTodos ? (
            <div
              className={`${
                completedTodos.length < 3 ? 'compndeltodos' : 'compndeltodoss'
              }`}
            >
              {deletedTodos.map((deletedTodo) => (
                <DeletedTodo key={deletedTodo.id} task={deletedTodo} />
              ))}
            </div>
          ) : (
            <div className={`${todos.length < 4 ? 'todos' : 'todoss'}`}>
              {todos.map((todo, index) =>
                todo.completed ? (
                  <TodoCompleted
                    task={todo}
                    key={index}
                    toggleComplete={toggleCompleted}
                    deleteTodo={deleteTodo}
                  />
                ) : todo.isEditing ? (
                  <EditTodoForm editTodo={editTask} task={todo} key={index} />
                ) : (
                  <Todo
                    task={todo}
                    key={index}
                    toggleComplete={toggleComplete}
                    deleteTodo={deleteTodo}
                    editTodo={editTodo}
                  />
                )
              )}
            </div>
          )}

          {/* <div className='completedtodos'>
          {completedTodos.map((todo) => <CompletedTodo task={todo} />)}
        </div>
        <div className="deletedtodos">
          {deletedTodos.map((deletedTodo) => (
            <DeletedTodo key={deletedTodo.id} task={deletedTodo} />
          ))}
        </div> */}
        </div>
        <div className="footer">
          <button className="func_button" onClick={showCompletedTodosFunc} data-tooltip="Go to completed tasks">
            {showCompletedTodos === true ? <img src={back} className="img" alt='img' /> : <img src={check} className='img' alt='img' />}
          </button>
          <button className="func_button" onClick={showDeletedTodosFunc} data-tooltip="Go to deleted tasks">
            {showDeletedTodos === true ? <img src={back} className="img" alt='img' /> : <img src={trash} className='img' alt='img' />}
          </button>
          <button className='func_button' onClick={clearFunc} data-tooltip={`Clear this list`}>
            <img src={cancel} className='img' alt='img' />
          </button>
        </div>
      </div>
    </div>
  )
}

export default TodoWrapper
