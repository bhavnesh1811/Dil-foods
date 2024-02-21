import React from "react";
import { Pie } from "react-chartjs-2";
// eslint-disable-next-line no-unused-vars
import { Chart as ChartJS } from "chart.js/auto";

const PieChart = ({ data }) => {
  return (
    <Pie
      data={data}
      options={{
        animations: {
          tension: {
            duration: 1000,
            easing: 'linear',
            from: 1,
            to: 0,
            loop: true
          }
        },
        scales: {
          y: {
            min: 0,
            max: 100
          }
        }
      }}
    />
  );
};

export default PieChart;
