import { useState, useEffect } from "react";
import axios from "axios";

// eslint-disable-next-line react/prop-types
const TODO = ({ id, title, date, deleteTodo, selectTodo }) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-around",
        width: "50%",
        margin: "1rem 0rem",
      }}
    >
      <span style={{ width: "150px", fontWeight: 800 }}>{title}</span>
      <p style={{ width: "100px", fontWeight: 800 }}>{date}</p>
      <div>
        <button
          onClick={() => deleteTodo(id)}
          style={{
            background: "red",
            padding: "4px 8px",
            color: "white",
            marginRight: "10px",
          }}
        >
          Delete
        </button>
        <button
          onClick={() => selectTodo(id)}
          style={{ background: "blue", padding: "4px 8px", color: "white" }}
        >
          Update
        </button>
      </div>
    </div>
  );
};

const ApplicationPage = () => {
  const [todos, setTodos] = useState([]);
  const [newTodoTitle, setNewTodoTitle] = useState("");
  const [newTodoDate, setNewTodoDate] = useState(null);

  const selectTodo = (id) => {
    const selectedTodo = todos.find((todo) => todo.id === id);
    setNewTodoTitle(selectedTodo.title);
    setNewTodoDate(selectedTodo.date);
    deleteTodo(id);
  };

  useEffect(() => {
    // Fetch todos from backend
    axios
      .get("/api/todos")
      .then((res) => setTodos(res.data))
      .catch((err) => console.error(err));
  }, []);

  const addTodo = () => {
    const newTODO = {
      id: Math.random(),
      title: newTodoTitle,
      date: newTodoDate,
    };
    // axios
    //   .post("/api/todos", { title: newTodoTitle })
    //   .then((res) => {
    //     setTodos([...todos, res.data]);
    //     setNewTodoTitle("");
    //   })
    //   .catch((err) => console.error(err));
    setTodos([...todos, newTODO]);
    clearTodoInput();
  };

  const clearTodoInput = () => {
    setNewTodoDate(null);
    document.getElementById("date").value = null;
    setNewTodoTitle("");
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
    // axios
    //   .delete(`/api/todos/${id}`)
    //   .then(() => {
    //     setTodos(todos.filter((todo) => todo._id !== id));
    //   })
    //   .catch((err) => console.error(err));
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <h1 style={{ textAlign: "center" }}>To-Do List</h1>
      <br />
      <br />
      <div
        style={{
          display: "flex",
          width: "20%",
          flexDirection: "column",
          gap: 12,
          marginBottom: "1rem",
        }}
      >
        <input
          type="text"
          style={{ padding: "12px", borderRadius: "8px" }}
          value={newTodoTitle}
          placeholder="Add TODO"
          onChange={(e) => setNewTodoTitle(e.target.value)}
        />
        <input
          id="date"
          type="date"
          value={newTodoDate}
          style={{ padding: "12px", borderRadius: "8px" }}
          onChange={(e) => setNewTodoDate(e.target.value)}
        />
        <button
          onClick={addTodo}
          style={{
            background: "blue",
            padding: "12px 8px",
            color: "white",
          }}
        >
          Add Todo
        </button>
      </div>
      <div
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        {todos.length === 0 ? (
          <span style={{ fontSize: "1.5rem", fontWeight: 600 }}>
            No TODOs Found
          </span>
        ) : (
          todos.map((todo) => (
            <TODO
              id={todo.id}
              title={todo.title}
              date={todo.date}
              key={todo.id}
              deleteTodo={deleteTodo}
              selectTodo={selectTodo}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default ApplicationPage;
