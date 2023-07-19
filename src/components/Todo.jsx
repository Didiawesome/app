import React from 'react'
import trash from '../img/trash.png'
import pencil from '../img/pencil.png'

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
            <img src={pencil} className="img" alt="img" />
          </button>
          <button onClick={() => deleteTodo(task.id)} className="todo__button">
            <img src={trash} className="img" alt="img" />
          </button>
        </div>
      </div>
  )
}

export default Todo
