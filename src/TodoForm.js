import React, { useState } from "react";

function TodoForm({ addTodo }) {
  const [titleValue, setTitleValue] = useState("");
  const [descriptionValue, setDescriptionValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!titleValue) return;
    addTodo(titleValue, descriptionValue);
    setTitleValue("");
    setDescriptionValue("");
  };

  return (
    <form onSubmit={handleSubmit} className="add-todo-form">
      <input
        type="text"
        value={titleValue}
        onChange={(e) => setTitleValue(e.target.value)}
        placeholder="Введіть нову задачу"
      />
      <textarea
        placeholder="Введіть опис"
        value={descriptionValue}
        onChange={(e) => setDescriptionValue(e.target.value)}
      />
      <button type="submit">Додати</button>
    </form>
  );
}

export default TodoForm;
