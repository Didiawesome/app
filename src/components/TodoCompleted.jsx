import React from 'react'
import trash from '../img/trash.png'

const TodoCompleted = ({ task, toggleComplete, deleteTodo }) => {
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
        <button onClick={() => deleteTodo(task.id)} className="todo__button">
          <img src={trash} className="img" alt="img" />
        </button>
      </div>
    </div>
  )
}

export default TodoCompleted
