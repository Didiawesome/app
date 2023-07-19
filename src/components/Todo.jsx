import React from 'react'

const Todo = ({ task, toggleComplete, deleteTodo, editTodo }) => {
  return (
    <div className="todo">
      <div className="task">
        <p
          onClick={() => toggleComplete(task.id)}
          className={`${task.completed ? 'completed' : ''} task`}
        >
          {task.task}
        </p>
      </div>
      <div>
        <button onClick={() => editTodo(task.id)} className="todo__button">
          Edit
        </button>
        <button onClick={() => deleteTodo(task.id)} className="todo__button">
          Delete
        </button>
      </div>
    </div>
  )
}

export default Todo
