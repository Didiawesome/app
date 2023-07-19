import React, { useState } from 'react'

const EditTodoForm = ({ editTodo, task }) => {
  const [value, setValue] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()

    if (value.trim().length !== 0) {
      editTodo(value, task.id)
    }

    setValue('')
  }

  return (
    <div>
      <div>
        <form onSubmit={handleSubmit} className="form">
          <input
            className="edit_input"
            type="text"
            placeholder="Update Task"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <button type="submit" className="form__button">
            Update
          </button>
        </form>
      </div>
    </div>
  )
}

export default EditTodoForm
