import React from "react";
import { Line } from "react-chartjs-2";
// eslint-disable-next-line no-unused-vars
import { Chart as ChartJS } from "chart.js/auto";

const LineChart = ({ data }) => {
  return (
    <Line
      data={data}
      options={{
        animations: {
          tension: {
            duration: 1000,
            easing: "linear",
            from: 1,
            to: 0,
            loop: true,
          },
        },
        scales: {
          y: {
            min: 0,
            max: 6000,
          },
        },
      }}
    />
  );
};

export default LineChart;
