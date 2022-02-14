import styled from "@emotion/styled";
import { Grid, TextField } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router";
import { FeatureBox } from "../StyledComponents/FeatureBox";
import { TasksHeading } from "../StyledComponents/FeatureHeading";

function NewTodoForm(props) {
  // const [task, setTask] = React.useState('');
  console.log("Props from new todo form : ", props);
  const inputRef = React.useRef(null);

  let navigate = useNavigate();

  React.useEffect(() => {
    inputRef.current.focus();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(inputRef.current.value);

    const id = props.todos.length === 0 ? 1 : props.todos[0].id + 1;
    console.log("NewId : ", id);
    // console.log("last task id : ", inputRef.current.value);
    debugger;
    props.handleAddTodo(inputRef.current.value, id);
    inputRef.current.value = "";
    navigate("/tasks");
  };

  React.useEffect(() => {
    console.log("Mounted NewTodoForm");
    return () => {
      console.log("Unmounted NewTodoForm");
    };
  }, []);

  return (
    <Grid container spacing={2} align="center" justify="center">
      <Grid item xs={12}>
        <FeatureBox>
          <Grid container spacing={2} align="center" justify="center">
            <Grid item xs={12}>
              <TasksHeading>Add Tasks <span style={{fontSize:"1.6rem"}}>✓</span></TasksHeading>
            </Grid>
            <Grid item xs={12}>
              <Form onSubmit={handleSubmit}>
                {/* <TextField required={true} ref={inputRef} name="task" type="text" label="Outlined" variant="outlined" /> */}

                <InputField
                  required
                  ref={inputRef}
                  type="text"
                  name="task"
                  placeholder="Add Task ..."
                  maxlength="200"
                />
                <Button disabled={props.loading} type="submit">
                  Add Task
                </Button>
              </Form>
            </Grid>
          </Grid>
        </FeatureBox>
      </Grid>
    </Grid>
  );
}

export default NewTodoForm;

/* ------------------------------------------------- STYLES ------------------------------------------------ */

const InputField = styled.input`
  width: 100%;
  height: 40px;
  border-radius: 5px;
  border: 1px solid #ccc;
  padding: 0 10px;
  font-size: 16px;
  outline: none;
  margin-bottom: 10px;
  background-color: #222c41;
  color: #fff;
`;

const Button = styled.button`
  // width: 100%;
  height: 40px;
  border-radius: 5px;
  border: none;
  padding: 0 15px;
  margin : 15px;
  font-size: 16px;
  outline: none;
  border-radius 15px;
  margin-bottom: 10px;
  background-color: #ffc148;
  color: #000;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 30px 10px;
`;
