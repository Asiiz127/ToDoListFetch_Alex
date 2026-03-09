// TodoApp.jsx
import React, { useState, useEffect } from "react";
import TodoFooter from "../components/TodoFooter";
import TodoInput from "../components/TodoInput";
import TodoList from "../components/TodoList";

const TodoApp = () => {
  const [todos, setTodos] = useState([]);
  const USERNAME = "Asiiz127";

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const resp = await fetch(
        `https://playground.4geeks.com/todo/users/${USERNAME}`
      );
      const data = await resp.json();
      const items = data.items || data.todos || [];
      setTodos(items);
      console.log("DATA GET USER:", data);
    } catch (error) {
      console.error("Error loading todos:", error);
    }
  };

  const handleAddTodo = async (text) => {
    const trimmed = text.trim();
    if (!trimmed) return;

    const newTodo = { label: trimmed, is_done: false };

    try {
      await fetch(
        `https://playground.4geeks.com/todo/todos/${USERNAME}`,
        {
          method: "POST",
          body: JSON.stringify(newTodo),
          headers: { "Content-Type": "application/json" }
        }
      );
      fetchTodos();
    } catch (error) {
      console.error("Error creating todo:", error);
    }
  };

  const handleDeleteTodo = async (id) => {
    try {
      await fetch(
        `https://playground.4geeks.com/todo/todos/${id}`,
        {
          method: "DELETE"
        }
      );
      fetchTodos();
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  const handleClearAll = async () => {
    for (const todo of todos) {
      await handleDeleteTodo(todo.id);
    }
  };

  return (
    <div className="app-wrapper">
      <div className="todo-card">
        <div className="todo-header">
          <h1 className="todo-title">ToDos</h1>
        </div>
        <TodoInput onAddTodo={handleAddTodo} />
        <TodoList todos={todos} onDeleteTodo={handleDeleteTodo} />
        <div className="todo-footer">
          <TodoFooter count={todos.length} />
          <button className="clear-all-btn" onClick={handleClearAll}>
          Clear all
          </button>
        </div>
      </div>
    </div>
  );
};

export default TodoApp;
