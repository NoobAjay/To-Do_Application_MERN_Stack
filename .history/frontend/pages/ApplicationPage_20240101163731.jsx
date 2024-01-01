import { useState, useEffect } from "react";
import axios from "axios";

// eslint-disable-next-line react/prop-types
const TODO = ({ title, date }) => {
  return (
    <div style={{ display: "flex", alignItems: "center", width: "100%" }}>
      <span>{title}</span>
      <p>{date}</p>
      <button style={{ background: "red", padding: "4px 8px", color: "white" }}>
        Delete
      </button>
    </div>
  );
};

const ApplicationPage = () => {
  const [todos, setTodos] = useState([{ title: "Hello", completed: true }]);
  const [newTodoTitle, setNewTodoTitle] = useState("");

  useEffect(() => {
    // Fetch todos from backend
    axios
      .get("/api/todos")
      .then((res) => setTodos(res.data))
      .catch((err) => console.error(err));
  }, []);

  const addTodo = () => {
    axios
      .post("/api/todos", { title: newTodoTitle })
      .then((res) => {
        setTodos([...todos, res.data]);
        setNewTodoTitle("");
      })
      .catch((err) => console.error(err));
  };

  const toggleCompleted = (id, completed) => {
    axios
      .put(`/api/todos/${id}`, { completed: !completed })
      .then((res) => {
        setTodos(
          todos.map((todo) =>
            todo._id === id ? { ...todo, completed: res.data.completed } : todo
          )
        );
      })
      .catch((err) => console.error(err));
  };

  const deleteTodo = (id) => {
    axios
      .delete(`/api/todos/${id}`)
      .then(() => {
        setTodos(todos.filter((todo) => todo._id !== id));
      })
      .catch((err) => console.error(err));
  };

  return (
    <div>
      <h1>To-Do List</h1>
      <input
        type="text"
        value={newTodoTitle}
        onChange={(e) => setNewTodoTitle(e.target.value)}
      />
      <button onClick={addTodo}>Add Todo</button>
      <div style={{ width: "100%" }}>
        {todos.map((todo) => (
          <TODO title={todo.title} date={todo.date} key={todo.id} />
        ))}
      </div>
    </div>
  );
};

export default ApplicationPage;
