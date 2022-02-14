import * as React from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import { makeStyles } from "@mui/styles";
import styled from "@emotion/styled";
import Graph from "./Graph";
import "../../App.css";
import { addTodo, removeTodo, fetchTodos } from "../../actions/tasks";
import Calendar from "./Calender";
import FirstRow from "./FirstRow";
import SecondRow from "./SecondRow";
import { collection, getDocs } from "firebase/firestore/lite";
import { db } from "../../config";
import { connect } from "react-redux";
import "./styles/calender.css";
import LeftSidebar from "./LeftSidebar";
import { Route, Routes } from "react-router-dom";
import Todos from "../Todos/TodoList";
import NewTodoForm from "../Add/index";
import { useLocation } from "react-router-dom";

//CSS for the component styling;
const useStyles = makeStyles((theme) => ({
  main: {
    backgroundColor: "#222c41",
    color: "#fff",
    height: "100vh",
  },
  mainHeading: {
    fontWeight: "600",
    fontSize: "2rem",
    h4: {
      fontWeight: "600",
    },
    padding: "1rem",
  },
}));

function Dashboard(props) {
  // Accessing Styles from the makeStyles() hook;
  const classes = useStyles();

  // State Variables;
  const [selected, setSelected] = React.useState("/");

  //Checking the Current Route Path to Update the Active Navbar Link;
  const location = useLocation();
  const path = location.pathname;
  React.useEffect(() => {
    setSelected(path);
  }, [path]);

  //Calling DB and syncing the redux state with the DB;
  React.useEffect(() => {
    const fetchTodos = async () => {
      // const db = getFirestore(app);
      const tasksCol = collection(db, "tasks");
      const tasksSnapshot = await getDocs(tasksCol);
      const todosList = tasksSnapshot.docs.map((doc) => doc.data());
      todosList.sort(function (a, b) {
        return b.id - a.id;
      });
      console.log("TodosList: ", todosList);

      // calling actiom creator to update the redux state;
      if (todosList.length > 0) {
        props.fetchTodos(todosList);
      }

      return;
    };

    fetchTodos();
  }, []);

  //Conditional Rendering of content of center grid using Routes;
  const renderRoutes = (index) => {
    return (
      <Routes>
        <Route
          path="/"
          element={
            <>
              <FirstRow />
              <SecondRow tasks={props.todos} />
              <Graph tasks={props.todos} />
              {/* <Calendar /> */}
            </>
          }
        />
        <Route path="/calendar" element={<h1>Calender</h1>} />
        <Route path="/new" element={<NewTodoForm />} />
        <Route path="/tasks" element={<Todos />} />
      </Routes>
    );
  };

  //Returning JSX for Rendering;

  return (
    <ContainerBox sx={{ display: "flex", flexDirection: "column", p: 2 }}>
      <CssBaseline />
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        spacing={0}
      >
        <Grid item xs={3} md={3} lg={2} style={{ position: "relative" }}>
          <LeftBarContainer>
            <LeftSidebar selected={selected} setSelected={setSelected} />
          </LeftBarContainer>
        </Grid>

        <Grid item xs={6} md={6}>
          <Box
            component="main"
            className={classes.main}
            // sx={{ flexGrow: 1 }}
            p={2}
          >
            {renderRoutes(selected)}
          </Box>
        </Grid>
        <Grid item xs={3} md={3} lg={3} style={{ position: "relative" }}>
          <RightBarContainer>
            <Calendar />
          </RightBarContainer>
        </Grid>
      </Grid>
    </ContainerBox>
  );
}

function mapStateToProps(state) {
  return {
    todos: state.todos,
  };
}
export default connect(mapStateToProps, { addTodo, removeTodo, fetchTodos })(
  Dashboard
);

/* ------------------------------------ Styles using StyledComponents ------------------------------------------*/

const ContainerBox = styled(Box)`
  background-color: #222c41;
`;

const LeftBarContainer = styled(Box)`
  background-color: #fff;
  min-height: 95.5vh;
  border-radius: 23px;
  max-width: 330px;

  position: fixed; // Newly Added CSS
  max-width: 300px; // Newly Added CSS
  left: 15px; // Newly Added CSS
  top: 15px; // Newly Added CSS
`;

const RightBarContainer = styled(Box)`
  background-color: #2e384e;
  height: 95.5vh;
  border-radius: 23px;
  // max-width: 310px;
  box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.5);
  margin-left: auto;

  position: fixed; // Newly Added CSS
  max-width: 350px; // Newly Added CSS
  right: 15px; // Newly Added CSS
  top: 20px; // Newly Added CSS
`;
