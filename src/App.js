import React, { useState, useEffect } from "react";
import EditForm from "./EditForm";
import DeleteModal from "./DeleteModal";
import TodoList from "./TodoList";
import TodoForm from "./TodoForm";
import RequestsHandler from "./requestsHandler";
import { STATUSES } from "./constants";
// import { testTodos, testCurrentTodos, testCompletedTodos } from "./mocks";

function App() {
  const [todos, setTodos] = useState([]);
  const [currentTodos, setCurrentTodos] = useState([]);
  const [completedTodos, setCompletedTodos] = useState([]);
  const [loading, setLoading] = useState(true); // Для індикатора завантаження
  const [error, setError] = useState(null); // Для обробки помилок
  const [modalIsOpen, setIsOpen] = useState(false);
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);
  const [currentTodo, setCurrentTodo] = useState({});

  const fetchData = async () => {
    try {
      setLoading(true);
      const { data } = await RequestsHandler.getAll();

      const todosList = data.filter(todo => todo.status === 'NEW');
      const currentTodos = data.filter(todo => todo.status === 'IN-PROGRESS');
      const completedList = data.filter(todo => todo.status === 'COMPLETED');

      setTodos(todosList);
      setCompletedTodos(currentTodos);
      setCompletedTodos(completedList);
      setLoading(false);
    } catch (err) {
      setTimeout(() => {
        setLoading(false);
      }, 200);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const addTodo = async (title, description = "") => {
    const newTodo = { title, description, status: STATUSES.NEW };
    setTodos([...todos, newTodo]);
    RequestsHandler.add("todos", newTodo);
  };

  const handleSort = (newOrder, listType) => {
    if (listType === "todos") {
      setTodos(newOrder);
    } else if (listType === "currentTodos") {
      setCurrentTodos(newOrder);
    } else {
      setCompletedTodos(newOrder);
    }
  };

  const handleMove = (from, to, fromIndex, toIndex) => {
    if (from === "todos" && to === "currentTodos") {
      const item = todos[fromIndex];
      setTodos(todos.filter((todo) => todo !== item));
      setCurrentTodos([...currentTodos, item]);
      RequestsHandler.setList(to, item._id, toIndex);
    } else if (from === "completedTodos" && to === "todos") {
      const item = completedTodos[fromIndex];
      setCompletedTodos(completedTodos.filter((todo) => todo !== item));
      setTodos([...todos, item]);
      RequestsHandler.setList(to, item._id, toIndex);
    } else if (from === "currentTodos" && to === "completedTodos") {
      const item = currentTodos[fromIndex];
      setCurrentTodos(currentTodos.filter((todo) => todo !== item));
      setCompletedTodos([...completedTodos, item]);
      RequestsHandler.setList(to, item._id, toIndex);
    }
  };

  const getListByListType = (listType) => {
    const listTypesMapping = {
      todos: todos,
      currentTodos: currentTodos,
      completedTodos: completedTodos
    };
    return listTypesMapping[listType];
  };

  const sendSort = async (listType, oldIndex, newIndex) => {
    const item = getListByListType(listType)[oldIndex];
    RequestsHandler.setPriority(listType, item._id, newIndex);
  };

  function openModal(todo) {
    if (!modalIsOpen) {
      setIsOpen(true);
      setCurrentTodo(todo);
    }
  }

  function closeModal() {
    if (modalIsOpen) {
      setIsOpen(false);
      setCurrentTodo({});
    }
  }

  function openDeleteModal(todo) {
    if (!deleteModalIsOpen) {
      setDeleteModalIsOpen(true);
      setCurrentTodo(todo);
    }
  }

  function closeDeleteModal() {
    if (deleteModalIsOpen) {
      setDeleteModalIsOpen(false);
      setCurrentTodo({});
    }
  }

  const handleDelete = (id) => {
    setTodos((todos) => todos.filter((todo) => todo._id !== id));
    setCurrentTodos((todos) => todos.filter((todo) => todo._id !== id));
    setCompletedTodos((todos) => todos.filter((todo) => todo._id !== id));
  };

  const handleEdit = () => {
    const { _id } = currentTodo;
    setTodos(todos.map(todo => todo._id === _id ? currentTodo : todo));
    setCurrentTodos(currentTodos.map(todo => todo._id === _id ? currentTodo : todo));
    setCompletedTodos(completedTodos.map(todo => todo._id === _id ? currentTodo : todo));
  };

  // if (loading) return <p>Завантаження...</p>;
  if (error) return <p>Помилка: {error}</p>;

  return (
    <div>
      <EditForm
        modalIsOpen={modalIsOpen}
        closeModal={closeModal}
        todo={currentTodo}
        setTodo={setCurrentTodo}
        save={handleEdit}
      />

      <DeleteModal
        modalIsOpen={deleteModalIsOpen}
        closeModal={closeDeleteModal}
        todo={currentTodo}
        setTodo={handleDelete}
      />

      <h1>Туду-ліст</h1>
      <TodoForm addTodo={addTodo} />

      <div style={{ display: "flex", justifyContent: "space-around" }}>
        <div>
          <h2>Невиконані Завдання</h2>
          <TodoList
            todos={todos}
            handleSort={(newOrder) => handleSort(newOrder, "todos")}
            handleMove={handleMove}
            openModal={openModal}
            openDeleteModal={openDeleteModal}
            listType="todos"
            group="shared"
            sendSort={sendSort}
          />
        </div>

        <div>
          <h2>Завдання, що виконуються</h2>
          <TodoList
            todos={currentTodos}
            handleSort={(newOrder) => handleSort(newOrder, "currentTodos")}
            handleMove={handleMove}
            openModal={openModal}
            openDeleteModal={openDeleteModal}
            listType="currentTodos"
            group="shared"
            sendSort={sendSort}
          />
        </div>

        <div>
          <h2>Виконані завдання</h2>
          <TodoList
            todos={completedTodos}
            handleSort={(newOrder) => handleSort(newOrder, "completedTodos")}
            handleMove={handleMove}
            openModal={openModal}
            openDeleteModal={openDeleteModal}
            listType="completedTodos"
            group="shared"
            sendSort={sendSort}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
