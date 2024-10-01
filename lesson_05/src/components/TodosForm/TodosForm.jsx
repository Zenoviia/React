import React, { useState } from "react";
import "./style.css";
import service from "../../services/todos";
import FormButton from "../Buttons/FormButton/FormButton";

export default function TodosForm({ liftingNewTodo }) {
  const DEFAULT_NEW_TODO = {
    title: "Input title",
    completed: true,
  };
  const [newTodo, setNewTodo] = useState(DEFAULT_NEW_TODO);

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
  };

  return (
    <form className="todos__form" onSubmit={handleNewTodoSubmit}>
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
      <FormButton />
    </form>
  );
}
