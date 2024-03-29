import React from "react";
import { Pie } from "react-chartjs-2";
// eslint-disable-next-line no-unused-vars
import { Chart as ChartJS } from "chart.js/auto";

const PieChart = ({ data }) => {
  return <Pie data={data} />;
};

export default PieChart;
