import { Grid } from "@mui/material";
import React from "react";
import styled from "@emotion/styled";

import Box from "@mui/material/Box";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import TaskIcon from "@mui/icons-material/Task";
import "../../App.css";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { FeatureBox } from "../StyledComponents/FeatureBox";


function SecondRow({ tasks }) {
  // console.log("SecondRow props: ", tasks);

  const getCount = () => {
    const completedTasks = tasks.filter((task) => task.completed === true);
    return completedTasks.length;
  }


  const getPrecentage = () => {
    const completedTasks = tasks.filter((task) => task.completed);
    const percentage = Math.round((completedTasks.length / tasks.length) * 100);
    return percentage;
  };


  return (
    <Grid container spacing={5} mt={1}>
      <Grid item xs={12} md={6}>
        <FeatureBox>
          <Grid container spacing="3" alignItems="center">
            <Grid item xs={3}>
              <IconBox>
                <TaskIcon />
              </IconBox>
            </Grid>
            <Grid item xs={6}>
              <TasksHeading>{getCount()} Tasks</TasksHeading>
              <TasksSubHeading>Completed</TasksSubHeading>
            </Grid>
            <Grid item xs={3}>
              <div
                style={{
                  width: 70,
                  height: 60,
                  alignItems: "center",
                  display: "flex",
                  justifyContent: "center",
                  margin: "0 auto",
                }}
              >
                <CircularProgressbar
                  value={getPrecentage()}
                  text={`${getPrecentage()}%`}
                  strokeWidth={12}
                />
              </div>
            </Grid>
          </Grid>
        </FeatureBox>
      </Grid>
      <Grid item xs={12} md={6}>
        <FeatureBox>
          <Grid container spacing="3" alignItems="center">
            <Grid item xs={3}>
              <IconBox>
                <PendingActionsIcon />
              </IconBox>
            </Grid>
            <Grid item xs={6}>
              <TasksHeading>{tasks.length - getCount()} Tasks</TasksHeading>
              <TasksSubHeading>Pending</TasksSubHeading>
            </Grid>
            <Grid item xs={3}>
              <div
                style={{
                  width: 70,
                  height: 60,
                  alignItems: "center",
                  display: "flex",
                  justifyContent: "center",
                  margin: "0 auto",
                }}
              >
                <CircularProgressbar
                  value={100 - getPrecentage()}
                  text={`${100 - getPrecentage()}%`}
                  strokeWidth={12}
                />
              </div>
            </Grid>
          </Grid>
        </FeatureBox>
      </Grid>
    </Grid>
  );
}

export default SecondRow;

const IconBox = styled(Box)`
  border-radius: 9px;
  padding: 1rem 0rem;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  border-color: grey;
  color: #ffc148;
  border-style: solid;
  border-width: 0.5px;
  max-width: 50px;
`;

const TasksHeading = styled.h3`
  font-size: 1.3rem;
  font-weight: 600;
  text-align: start;
  padding-bottom: 0px;
  margin-bottom: 0px;
`;

const TasksSubHeading = styled.h6`
  font-size: 1rem;
  font-weight: 400;
  text-align: start;
  color: grey;
  margin-top: 0px;
`;
