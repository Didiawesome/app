import React from 'react'

const CompletedTodo = ({ task }) => {
  return (
    <div className="compndeltodo">
      <p>{task.task}</p>
    </div>
  )
}

export default CompletedTodo
