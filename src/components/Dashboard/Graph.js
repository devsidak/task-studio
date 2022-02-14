import React, { useMemo } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { Grid } from "@mui/material";
import { Box } from "@mui/system";
import { FeatureBox } from "../StyledComponents/FeatureBox";

import {getMomentsData} from '../../utils/moments';


ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);




export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
      display: true,
    },
    title: {
      display: false,
      text: "Overview",
    },
  },
};

const labels = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];



export default function Graph({tasks}) {

  const overviewData = useMemo(() => {
    return getMomentsData(tasks);
  }, [tasks]);

  const data = {
    labels,
    datasets: [
      {
        label: "Completed Tasks",
        data: overviewData,
        borderColor: "#FCC14C",
        backgroundColor: "steelblue",
      },
    ],
  };
  

  return (
    <FeatureBox container mt={6} component={Box}>
      <Grid item xs={12}>
        <h3 style={{padding:"10px 7px", textAlign:"start"}} >Overview</h3> 
        <Line data={data} options={options} />
      </Grid>
    </FeatureBox>
  );
}

// const MainWrapper = styled(Grid)`
// `;
