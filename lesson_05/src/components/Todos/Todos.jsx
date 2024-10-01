import React, { useState } from "react";
import TodosForm from "../TodosForm/TodosForm";
import TodosList from "../TodosList/TodosList";

function Todos({ liftingNewTodoToApp }) {
  const [newTodo, setNewTodo] = useState({});

  const liftingNewTodo = (item) => {
    liftingNewTodoToApp(item);

    setNewTodo(item);
  };

  return (
    <>
      <TodosForm liftingNewTodo={liftingNewTodo} />
      <TodosList newTodo={newTodo} />
    </>
  );
}

export default Todos;
