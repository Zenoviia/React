import React, { useState, useEffect, useMemo } from "react";
import service from "../../services/todos";
import "./style.css";
import ListButton from "../Buttons/ListButton/ListButton";

export default function TodosList({ newTodo }) {
  const [todos, setTodos] = useState([]);

  //   const sortedTodos = useMemo(
  //     () => todos.sort((a, b) => b.completed - a.completed),
  //     [todos]
  //   );

  const sortedTodos = todos.sort((a, b) => b.completed - a.completed);

  const getTodos = async () => {
    const response = await service.get();

    setTodos(response);
  };

  useEffect(() => {
    getTodos();
  }, []);

  useEffect(() => {
    if (Object.keys(newTodo).length) getTodos();
  }, [newTodo]);

  const getClassName = (item) => {
    const classes = ["todos__item"];
    if (item.completed) classes.push("todos__item--completed");

    return classes.join(" ");
  };

  const handleItemDelete = async (id) => {
    await service.delete(id);
    getTodos();
  };

  const handleChangeCompleted = async (item) => {
    await service.put(item.id, {
      ...item,
      completed: !item.completed,
    });
    getTodos();
  };

  return sortedTodos.length ? (
    <ul>
      {sortedTodos.map((item) => (
        <li key={item.id} className={getClassName(item)}>
          {item.title}
          <ListButton onClick={() => handleItemDelete(item.id)} />{" "}
          <input
            type="checkbox"
            defaultChecked={item.completed}
            onChange={() => handleChangeCompleted(item)}
          />
        </li>
      ))}
    </ul>
  ) : null;
}
