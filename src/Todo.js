import React from "react";

function Todo({todo, removeTodo }) {
  console.log(todo);
  

  return (
    <div>
      <button
      style={{margin:"8px"}}
      onClick={() => { removeTodo(todo.id) }}
      >
            <strong>{todo.task}</strong>
      </button>
    </div>
  );
}

export default Todo;
