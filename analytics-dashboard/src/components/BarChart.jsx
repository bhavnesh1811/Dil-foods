import React from 'react'
import { Bar } from "react-chartjs-2";
// eslint-disable-next-line no-unused-vars
import {Chart as ChartJS} from "chart.js/auto"

const BarChart = ({data}) => {
   
    return (
        <Bar data={data}/>
    )
}

export default BarChart