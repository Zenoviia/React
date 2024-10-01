import React, { useState, useRef } from "react";
import "./style.css";
import service from "../../services/todos";

export default function TodosForm( {liftingNewTodo} ) {
  const DEFAULT_NEW_TODO = {
    title: "Hi:)",
    completed: true,
  };
  const [newTodo, setNewTodo] = useState(DEFAULT_NEW_TODO);

  const formRef = useRef();

  const handleNewTodoTitle = (event) => {
    setNewTodo((prevState) => ({ ...prevState, title: event.target.value }));
  };

  const handleNewTodoCompleted = (event) => {
    setNewTodo((prevState) => ({
      ...prevState,
      completed: event.target.checked,
    }));
  };

  const handleNewTodoSubmit = async (e) => {
    e.preventDefault();
    const response = await service.post(newTodo);
    liftingNewTodo(response);

    setNewTodo(DEFAULT_NEW_TODO);
    formRef.current.reset();
  };

  return (
    <form ref={formRef} className="todos__form" onSubmit={handleNewTodoSubmit}>
      {" "}
      <label>
        Title:{" "}
        <input
          type="text"
          defaultValue={newTodo.title}
          onChange={handleNewTodoTitle}
        />{" "}
      </label>
      <label>
        Completed:{" "}
        <input
          type="checkbox"
          defaultChecked={newTodo.completed}
          onChange={handleNewTodoCompleted}
        />
      </label>
      <button>Add new todo</button>
    </form>
  );
}
