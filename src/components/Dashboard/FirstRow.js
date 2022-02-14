import { Button, Grid } from "@mui/material";
import React from "react";
import styled from "@emotion/styled";
import moment from "moment";
import Box from "@mui/material/Box";

import Typography from "@mui/material/Typography";

import AddIcon from "@mui/icons-material/Add";

import {useNavigate} from 'react-router-dom';
import "../../App.css";

function FirstRow() {
  const [state, setState] = React.useState([]);
  const navigate = useNavigate();

  function generateGreetings() {
    var currentHour = moment().format("HH");
    console.log("currentHr : ", currentHour);
    if (currentHour >= 3 && currentHour < 12) {
      return ["Good Morning", "🌞"];
    } else if (currentHour >= 12 && currentHour < 15) {
      return ["Good Afternoon", "🌤"];
    } else if (currentHour >= 15 && currentHour < 20) {
      return ["Good Evening", "🌄"];
    } else if (currentHour >= 20 && currentHour < 3) {
      return ["Good Night", "🌙"];
    } else {
      return ["Hey Geek", "🤓"];
    }
  }
  React.useEffect(() => {
    const Greetings = generateGreetings();
    setState(Greetings);
  }, []);

  return (
    <Grid container spacing={6}>
      <Grid item xs={6}>
        <Typographyh4 variant="h4" component="h3">
          {state[0]} <span style={{ fontSize: "2.5rem" }}>{state[1]}</span>
        </Typographyh4>
      </Grid>
      <Grid item xs={6} style={{ textAlign: "center" }}>
        <Box display="flex" justifyContent="flex-end">
          <AddButton variant="contained" onClick={()=> navigate("/new")}>
            <AddIcon /> Add Task
          </AddButton>
        </Box>
      </Grid>
    </Grid>
  );
}

export default FirstRow;

const Typographyh4 = styled(Typography)`
  font-weight: 400;
`;

const AddButton = styled(Button)`
  color: #000;
  background-color: #ffc148;
  text-transform: capitalize;
  border-radius: 15px;
  padding: 0.5rem 1rem;

  &:hover {
    background-color: #ffc148;
  }
`;
