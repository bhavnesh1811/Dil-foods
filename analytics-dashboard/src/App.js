import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import { useEffect, useState } from "react";
import { getData } from "./redux/chartData/chartData.action";
import BarChart from "./components/BarChart";
import Loader from "./components/Loader";
import LineChart from "./components/LineChart";
import PieChart from "./components/PieChart";
import { Box, Flex, Heading } from "@chakra-ui/react";
import SelectChart from "./components/SelectChart";
import { useSearchParams } from "react-router-dom";
import SelectYear from "./components/SelectYear";

function App() {
  const dispatch = useDispatch();
  const { loading, chartData } = useSelector((store) => store.chartData);
  const [searchParams] = useSearchParams();
  const [currentIndex, setCurrentIndex] = useState(
    searchParams.get("charttype") || "bar"
  );
  const [year, setCurrentYear] = useState(searchParams.get("year") || "2020");
  const [salesData, setSalesData] = useState({
    labels: chartData?.map((data) => data.month),
    datasets: [
      {
        label: "Total Sales",
        data: chartData?.map((data) => data.sales),
        backgroundColor: "red",
        borderColor: "black",
        borderWidth: 2,
      },
      {
        label: "Total Revenue",
        data: chartData?.map((data) => data.revenue),
        backgroundColor: "blue",
        borderColor: "black",
        borderWidth: 2,
      },
      {
        label: "Total Users Active",
        data: chartData?.map((data) => data.userActivity),
        backgroundColor: "green",
        borderColor: "black",
        borderWidth: 2,
      },
    ],
  });

  useEffect(() => {
    dispatch(getData(year));
  }, [year]);

  useEffect(() => {
    setSalesData({
      labels: chartData?.map((data) => data.month),
      datasets: [
        {
          label: "Total Sales",
          data: chartData?.map((data) => data.sales),
          backgroundColor: "red",
          borderColor: "black",
          borderWidth: 2,
        },
        {
          label: "Total Revenue",
          data: chartData?.map((data) => data.revenue),
          backgroundColor: "blue",
          borderColor: "black",
          borderWidth: 2,
        },
        {
          label: "Total Users Active",
          data: chartData?.map((data) => data.userActivity),
          backgroundColor: "green",
          borderColor: "black",
          borderWidth: 2,
        },
      ],
    });
  }, [chartData]);

  useEffect(() => {
    setCurrentIndex(searchParams.get("charttype") || "bar");
    setCurrentYear(searchParams.get("year") || "2020");
  }, [searchParams, year]);

  return (
    <Box className="App">
      <Heading my={"12px"}>Analytics DashBoard</Heading>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Flex justifyContent={{base:"flex-start",lg:"space-between"}} >
            <SelectYear />
            <SelectChart />
          </Flex>
          <Flex
            maxWidth={
              currentIndex === "pie"
                ? { base: "100%", md: "60%", lg: "40%" }
                : { base: "100%", md: "80%" }
            }
            m="auto"
            alignItems={"center"}
          >
            {currentIndex === "bar" ? (
              <BarChart data={salesData} />
            ) : currentIndex === "line" ? (
              <LineChart data={salesData} />
            ) : (
              <PieChart data={salesData} />
            )}
          </Flex>
        </>
      )}
    </Box>
  );
}

export default App;
