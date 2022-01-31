import React from "react";
import Todos from "./TodoList";
import "./App.css";
import { Link, Route, Routes, Navigate } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <h1>WELCOME TO THE TODO APP</h1>
      <p>
        <Link to="/todos">See My Todos !</Link>
      </p>
      <p>
        <Link to="/todos/new">Add Todos !!</Link>
      </p>
      <Routes>
        <Route path="/todos/*" element={<Todos/>} />
        <Route exact path="/" element={() => <Navigate to="/todos" />} />

      </Routes>
      {/* <Todos /> */}
    </div>
  );
}

export default App;
