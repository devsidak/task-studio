import React from "react";
import Todo from "./Todo";
import { connect } from "react-redux";
import { addTodo, removeTodo, fetchTodos } from "../../actions/tasks";
import List from "@mui/material/List";
import Grid from "@mui/material/Grid";
import {
  collection,
  getDocs,
  where,
  query,
  deleteDoc,
  doc,
  setDoc,
} from "firebase/firestore/lite";
import Edit from "./Edit";

import { db } from "../../config.js";

function TodoList(props) {
  const [loading, setLoading] = React.useState(false);
  const [editBox, setEditBox] = React.useState(false);

  const [editTaskValue, setEditTaskValue] = React.useState("");
  const [editTaskId, setEditTaskId] = React.useState("");

  //Calling DB and syncing the redux state with the DB;

  const fetchTodos = async () => {
    const tasksCol = collection(db, "tasks");
    const tasksSnapshot = await getDocs(tasksCol);
    const todosList = tasksSnapshot.docs.map((doc) => doc.data());
    todosList.sort(function (a, b) {
      return b.id - a.id;
    });

    //calling actiom creator to update the redux state
    if (todosList.length > 0) {
      props.fetchTodos(todosList);
    }

    return;
  };

  const removeTodo = async (id) => {
    setLoading(true);
    props.removeTodo(id);
    const tasksCol = collection(db, "tasks");
    const docId = [];
    try {
      const q = query(tasksCol, where("id", "==", id));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        docId.push(doc.id);
        console.log(doc.id, " => ", docId);
      });
      const deleteDocRef = doc(db, "tasks", docId[0]);
      await deleteDoc(deleteDocRef);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const udpateCompletionStatus = async (id, completionStatus) => {
    setLoading(true);
    const tasksCol = collection(db, "tasks");
    var docId;
    try {
      const q = query(tasksCol, where("id", "==", id));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        docId = doc.id;
        console.log(doc.id, " => ", docId);
      });
      const updateRef = doc(db, "tasks", docId);
      await setDoc(updateRef, { completed: completionStatus }, { merge: true });
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const SubmitEditedChanges = async () => {
    setLoading(true);
    const tasksCol = collection(db, "tasks");
    var docId;
    try {
      const q = query(tasksCol, where("id", "==", editTaskId));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        docId = doc.id;
      });
      debugger;
      const updateRef = doc(db, "tasks", docId);
      await setDoc(updateRef, { task: editTaskValue }, { merge: true });
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
    setEditBox(!editBox);
    fetchTodos();
  };

  const renderTodos = () => {
    return props.todos.map((todo) => {
      return (
        <Todo
          key={todo.id}
          todo={todo}
          udpateCompletionStatus={udpateCompletionStatus}
          handleEditTask={handleEditTask}
          loading={loading}
          setLoading={setLoading}
          removeTodo={removeTodo}
        />
      );
    });
  };

  const handleEditTask = (task) => {
    setEditBox(!editBox);
    setEditTaskValue(task.task);
    setEditTaskId(task.id);
  };

  return (
    <div>
      {editBox && (
        <Edit
          task={editTaskValue}
          setEditBox={setEditBox}
          handleTaskChange={setEditTaskValue}
          SubmitEditedChanges={SubmitEditedChanges}
        />
      )}
      {!editBox && (
        <Grid container spacing={2} alignItems="center" justifyContent="center">
          <Grid item xs={12}>
            <List>{renderTodos()}</List>
          </Grid>
        </Grid>
      )}
    </div>
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
