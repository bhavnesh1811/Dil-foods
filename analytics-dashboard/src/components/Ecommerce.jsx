import { Box, Flex, Text } from "@chakra-ui/react";
import React from "react";
import { calculateMetrics } from "../scripts/calculatemetrics";
import PieChart from "./PieChart";
import LineChart from "./LineChart";
import BarChart from "./BarChart";

const Ecommerce = ({ chartData }) => {
  console.log(chartData);
  const metrics = calculateMetrics(chartData);
  const pieChartData = {
    labels: chartData?.map((data) => data.month),
    datasets: [
      {
        label: "Total Sales",
        data: chartData?.map((data) => data.sales),
        backgroundColor: "red",
        borderColor: "black",
        borderWidth: 2,
      }
    ],
  };
  const lineChartData = {
    labels: chartData?.map((data) => data.month),
    datasets: [
      {
        label: "Total Revenue",
        data: chartData?.map((data) => data.revenue),
        backgroundColor: "blue",
        borderColor: "black",
        borderWidth: 2,
      },
    ],
  };

  const barChartData = {
    labels: chartData?.map((data) => data.month),
    datasets: [
      {
        label: "Total Users Active",
        data: chartData?.map((data) => data.userActivity),
        backgroundColor: "green",
        borderColor: "black",
        borderWidth: 2,
      },
    ],
  };

  return (
    <Box>
      <Flex direction={{base:"column",md:"row"}} flexWrap={"wrap"} gap={"12px"} alignItems={"center"}>
        <Box boxShadow={"2xl"} p={"12px"} borderRadius={"12px"}>
          <Text>Total Sales : {metrics.totalSales}</Text>
          <PieChart data={pieChartData} />
        </Box>
        <Box boxShadow={"2xl"} p={"12px"} borderRadius={"12px"}>
          <Text>Total Revenue : {metrics.totalRevenue}</Text>
          <LineChart data={lineChartData} />
        </Box>
        <Box boxShadow={"2xl"} p={"12px"} borderRadius={"12px"}>
          <Text>Total Users Visited : {metrics.totalUsers}</Text>
          <BarChart data={barChartData} />
        </Box>
      </Flex>
    </Box>
  );
};

export default Ecommerce;
