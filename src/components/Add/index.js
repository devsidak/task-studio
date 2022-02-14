import React from "react";
// import Todo from "./Todo";
import { connect } from "react-redux";
import { addTodo, removeTodo, fetchTodos } from "../../actions/tasks";
import AddTodoForm from "./NewTodoForm";
// import List from "@mui/material/List";
// import Grid from "@mui/material/Grid";
import moment from "moment";
import {
  collection,
  getDocs,
  addDoc,
  where,
  query,
  deleteDoc,
  doc,
  setDoc,
} from "firebase/firestore/lite";

import { db } from "../../config.js";

function TodoList(props) {

	React.useEffect(() => {
		console.log("New TodoList - ", props);

	})

  const [loading, setLoading] = React.useState(false);

  const handleAddTodo = (value, id) => {
    setLoading(true);
    props.addTodo(value);
    const time = moment().format("yyyy-MM-DD HH:mm:ss");
    const fid = `${id}`;
    // const tasksCol = collection(db, "tasks");
    // addDoc(tasksCol, { id, task: value, completed: false, time })
    setDoc(doc(db, "tasks", fid), { id, task: value, completed: false, time }, { merge: true })
      .then(() => {
        console.log("Document successfully written!");
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error writing document: ", error);
      });
  };

  return (
    <>

      <AddTodoForm {...props} handleAddTodo={handleAddTodo} loading={loading} />
    </>
  );
}

function mapStateToProps(state) {
  return {
    todos: state.todos,
  };
}

export default connect(mapStateToProps, { addTodo, removeTodo, fetchTodos })(
  TodoList
);

