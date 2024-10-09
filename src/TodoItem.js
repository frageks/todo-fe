import React from "react";
import { STATUSES } from "./constants";

function TodoItem({ todo, index, openModal, openDeleteModal }) {

  return (
    <li
      data-id={index}
      title={todo.description}
      style={{ textDecoration: todo.status === STATUSES.FINISHED ? "line-through" : "" }}>
        {todo.title}
        <span className="todo-actions edit-icon" onClick={() => openModal(todo)}>✎</span>
        <span className="todo-actions delete-icon" onClick={() => openDeleteModal(todo)}>✘</span>
    </li>
  );
}

export default TodoItem;
