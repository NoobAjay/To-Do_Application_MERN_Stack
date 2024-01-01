import { useState, useEffect } from "react";
import axios from "axios";

// eslint-disable-next-line react/prop-types
const TODO = ({ id, title, date }) => {
  return (
    <div key={id}>
      <h1>{title}</h1>
      <p>{date}</p>
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
      <ul>
        {todos.map((todo) => (
          <li key={todo._id}>
            <span
              style={{
                textDecoration: todo.completed ? "line-through" : "none",
              }}
            >
              {todo.title}
            </span>
            <button onClick={() => deleteTodo(todo._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ApplicationPage;
