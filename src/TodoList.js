import React from "react";
import TodoItem from "./TodoItem";
import { ReactSortable } from "react-sortablejs";

function TodoList({ todos, handleSort, handleMove, listType, group, sendSort, openModal, openDeleteModal }) {
  return (
    <div data-list={listType} className="wrap">
      <ReactSortable
        list={todos}
        setList={handleSort}
        tag="ul"
        group={group}
        onChange={(evt, sortable) => {
          // const newOrder = order.map((index) => todos[index]);
          // handleSort(newOrder);
        }}
        onEnd={(evt) => {
          const { oldIndex, newIndex, from, to } = evt;

          if (from !== to) {
            const fromListType = from.closest("div.wrap").getAttribute("data-list");
            const toListType = to.closest("div.wrap").getAttribute("data-list");
            handleMove(fromListType, toListType, oldIndex, newIndex);
          } else if (oldIndex !== newIndex) {
            sendSort(listType, oldIndex, newIndex);
          }
        }}
      >
        {todos.map((todo, index) => (
          <TodoItem key={index} todo={todo} index={index} openModal={openModal} openDeleteModal={openDeleteModal} />
        ))}
      </ReactSortable>
    </div>
  );
}

export default TodoList;
