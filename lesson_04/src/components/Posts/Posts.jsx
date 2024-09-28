import React, { useState, useEffect } from "react";
import './Posts.css'; 

export default function Posts() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const request = await fetch(
          "https://6675570ea8d2b4d072efa0bb.mockapi.io/tasks"
        );
        const response = await request.json();
        setPosts(response);
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  useEffect(() => {
    console.log("Board updated:", posts);
  }, [posts]);

  const getTasksByStatus = (status) => posts.filter((post) => post.status === status);

  let toDoTasks = getTasksByStatus(0);
  let inProgressTasks = getTasksByStatus(1);
  let doneTasks = getTasksByStatus(2);

  const updateTaskStatus = (id, newStatus) => {
    const updatedPosts = posts.map((post) =>
      post.id === id ? { ...post, status: newStatus } : post
    );
    setPosts(updatedPosts);
  };

  const deleteTask = (id) => {
    const updatedPosts = posts.filter((post) => post.id !== id);
    setPosts(updatedPosts);
  };

  const renderColumn = (title, tasks, buttons) => (
    <div className="column">
      <h3>{title}: {tasks.length}</h3>
      <ul>
        {tasks.map((item) => (
          <li key={item.id}>
            {item.title}{" "}
            {buttons(item)}
          </li>
        ))}
      </ul>
    </div>
  );
  
  return posts.length ? (
    <div className="container">
      {renderColumn("To Do", toDoTasks, (item) => (
        <button onClick={() => updateTaskStatus(item.id, 1)}>In progress</button>
      ))}
  
      {renderColumn("In Progress", inProgressTasks, (item) => (
        <>
          <button onClick={() => updateTaskStatus(item.id, 0)}>To do</button>
          <button onClick={() => updateTaskStatus(item.id, 2)}>Done</button>
        </>
      ))}
  
      {renderColumn("Done", doneTasks, (item) => (
        <button onClick={() => deleteTask(item.id)}>To archive</button>
      ))}
    </div>
  ) : null;
}
