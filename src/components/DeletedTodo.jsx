import React from 'react'

const DeletedTodo = ({ task }) => {
  return (
    <div className="compndeltodo">
      <p className='task'>{task.task}</p>
    </div>
  )
}

export default DeletedTodo
