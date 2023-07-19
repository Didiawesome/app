import React, { useState } from 'react'

const TodoForm = ({ addTodo }) => {
  const [value, setValue] = useState('')
  let placeholder = 'Add todo'

  const handleSubmit = (event) => {
    event.preventDefault()

    if (value.trim().length !== 0) {
      addTodo(value)
    }

    setValue('')
  }

  return (
    <form onSubmit={handleSubmit} className="form">
      <input
        autoComplete="off"
        className="input"
        type="text"
        name="todo"
        placeholder={placeholder}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button type="submit" className="form__button">
        +
      </button>
    </form>
  )
}

export default TodoForm
