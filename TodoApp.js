import React, { useState } from "react";

function TodoApp() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");

  // Handle input change
  function handleChange(event) {
    setInput(event.target.value);
  }

  // Add task
  function addTask() {
    if (input.trim() === "") return;

    const newTask = {
      id: Date.now(),
      text: input,
      completed: false
    };

    setTasks(tasks.concat(newTask));
    setInput("");
  }

  // Delete task
  function deleteTask(id) {
    const updated = tasks.filter(function(task) {
      return task.id !== id;
    });
    setTasks(updated);
  }

  // Toggle complete
  function toggleComplete(id) {
    const updated = tasks.map(function(task) {
      if (task.id === id) {
        return {
          id: task.id,
          text: task.text,
          completed: !task.completed
        };
      }
      return task;
    });
    setTasks(updated);
  }

  return (
    <div style={{ padding: "20px" }}>
      <h2>Todo App</h2>

      <input
        type="text"
        value={input}
        onChange={handleChange}
        placeholder="Enter task"
      />
      <button onClick={addTask}>Add</button>

      <ul>
        {tasks.map(function(task) {
          return (
            <li key={task.id} style={{ marginTop: "10px" }}>
              <span
                onClick={function() {
                  toggleComplete(task.id);
                }}
                style={{
                  cursor: "pointer",
                  textDecoration: task.completed ? "line-through" : "none"
                }}
              >
                {task.text}
              </span>

              <button
                onClick={function() {
                  deleteTask(task.id);
                }}
                style={{ marginLeft: "10px" }}
              >
                Delete
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default TodoApp;