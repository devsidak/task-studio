import React from "react";
// import { styled } from "@mui/material/styles";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import FolderIcon from "@mui/icons-material/Folder";
import DeleteIcon from "@mui/icons-material/Delete";
import { makeStyles } from "@mui/styles";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import styled from "@emotion/styled";
import { Checkbox } from "@mui/material";

const useStyles = makeStyles({
  listStyles: {
    backgroundColor: "#f5f5f5",
    borderRadius: "20px",
    padding: "13px",
    margin: "20px auto",
    boxShadow: "0px 0px 6px 0.4px rgb(0 0 0 / 30%)",

    "&:hover": {
      transition: "all 0.28s ease-in-out",
      boxShadow: "0px 0px 11px 0px rgb(0 0 0 / 95%)",
    },
  },
  icons: {
    padding: "5px",
    margin: "0px 0px 0px 5px",
    fontSize: "1.9rem",
    color: "#BDBDBD",

    "&:hover": {
      color: "#ff0000c7",
      transition: "all 0.3s",
    },
  },

  deleteIcon: {
    fontSize: "1.6rem",
  },

  editIcon: {
    padding: "5px",
    margin: "0px 0px 0px 5px",
    fontSize: "1.6rem",
    color: "#BDBDBD",

    "&:hover": {
      color: "#198cdf",
      transition: "all 0.3s",
    },
  },
});

function Todo({ todo, removeTodo }) {
  const classes = useStyles();

  const updateCompletionStatus = () => {
    const taskNextState = {...todo};
    taskNextState.completed = !todo.completed;

  }
  return (
    <div>
      <Task
        className={classes.listStyles}
        secondaryAction={
          <>
            <IconButton
              edge="end"
              aria-label="delete"
              onClick={() => removeTodo(todo.id)}
            >
              <ModeEditIcon
                style={{ fontSize: "38px" }}
                className={classes.editIcon}
              />
            </IconButton>
            <IconButton
              edge="end"
              aria-label="delete"
              onClick={() => removeTodo(todo.id)}
              className={classes.deleteButton}
            >
              <DeleteIcon
                style={{ fontSize: "38px" }}
                className={classes.icons}
              />
            </IconButton>
          </>
        }
      >
        <ListItemAvatar>
          <IconButton onClick={() => updateCompletionStatus()}>
              <Checkbox
                defaultChecked={todo.completed}
                // checked={todo.completed}
                sx={{ "& .MuiSvgIcon-root": { fontSize: 28 } }}
              />
          </IconButton>
        </ListItemAvatar>
        <ListItemText primary={todo.task} />
      </Task>
    </div>
  );
}

export default Todo;

const Task = styled(ListItem)`
  background-color: #2e384e;
  color: #fff;
  padding: 1.5rem 1rem;
`;
