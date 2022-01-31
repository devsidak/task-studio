import React from "react";
import Todo from "./Todo";
import { connect } from "react-redux";
import { addTodo, removeTodo } from "./actionCreators";
import AddTodoForm from "./NewTodoForm";
import { Route, Routes } from "react-router-dom";

function TodoList(props) {
  const removeTodo = (id) => {
    props.removeTodo(id);
  };

  const handleAddTodo = (value) => {
    props.addTodo(value);
  };

  console.log("TodoList props: ", props);

  const renderTodos = () => {
    return props.todos.map((todo) => {
      return <Todo key={todo.id} todo={todo} removeTodo={removeTodo} />;
    });
  };

  React.useEffect(() => {
    console.log("Mounted TodoList");

    return () => {
      console.log("Unmounted TodoList");
    };
  }, []);

  return (
    <div>
      <Routes>
        <Route
          path="/todos/new/"
          element={(props) => <AddTodoForm {...props} handleAddTodo={handleAddTodo} />} 
        />

        <Route
          exact
          path="/todos"
          element={() => <div>HEELO</div>}
        />
      </Routes>
      {/* {renderTodos()} */}
    </div>
  );
}

function mapStateToProps(state) {
  return {
    todos: state.todos,
  };
}

export default connect(mapStateToProps, { addTodo, removeTodo })(TodoList);
