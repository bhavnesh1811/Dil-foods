import React, { useEffect, useState } from "react";
import {
  Box,
  Flex,
  useColorModeValue,
  Drawer,
  DrawerContent,
  useDisclosure,
} from "@chakra-ui/react";
import BarChart from "./BarChart";
import LineChart from "./LineChart";
import PieChart from "./PieChart";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { getData, getTopSelling } from "../redux/chartData/chartData.action";
import Loader from "./Loader";
import SelectYear from "./SelectYear";
import Ecommerce from "./Ecommerce";
import MobileNav from "./MobileNav";
import SideBarContent from "./SideBarContent";
import { generateRandomColor } from "../scripts/generateColors";

const Sidebar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useDispatch();
  const { loading, chartData, topSelling } = useSelector(
    (store) => store.chartData
  );
  const [searchParams] = useSearchParams();
  const [year, setCurrentYear] = useState(searchParams.get("year") || "2020");
  const [salesData, setSalesData] = useState({
    labels: chartData?.map((data) => data.month),
    datasets: [
      {
        label: "Total Sales",
        data: chartData?.map((data) => data.sales),
        backgroundColor: generateRandomColor(),
        borderColor: "black",
        borderWidth: 2,
      },
      {
        label: "Total Revenue",
        data: chartData?.map((data) => data.revenue),
        backgroundColor: generateRandomColor(),
        borderColor: "black",
        borderWidth: 2,
      },
      {
        label: "Total Users Active",
        data: chartData?.map((data) => data.userActivity),
        backgroundColor: generateRandomColor(),
        borderColor: "black",
        borderWidth: 2,
      },
    ],
  });

  useEffect(() => {
    dispatch(getData(year));
    dispatch(getTopSelling(year));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [year]);

  useEffect(() => {
    setSalesData({
      labels: chartData?.map((data) => data.month),
      datasets: [
        {
          label: "Total Revenue",
          data: chartData?.map((data) => data.revenue),
          backgroundColor: generateRandomColor(),
          borderColor: "black",
          borderWidth: 2,
        },
        {
          label: "Total Users Active",
          data: chartData?.map((data) => data.userActivity),
          backgroundColor: generateRandomColor(),
          borderColor: "black",
          borderWidth: 2,
        },
        {
          label: "Total Sales",
          data: chartData?.map((data) => data.sales),
          backgroundColor: generateRandomColor(),
          borderColor: "black",
          borderWidth: 2,
        },
      ],
    });
  }, [chartData]);

  useEffect(() => {
    setCurrentYear(searchParams.get("year") || "2020");
  }, [searchParams]);

  return (
    <Box minH="100vh" bg={useColorModeValue("gray.100", "gray.900")}>
      <SideBarContent
        onClose={onClose}
        display={{ base: "none", md: "block" }}
      />
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <SideBarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <MobileNav onOpen={onOpen} />
      <Box ml={{ base: 0, md: 60 }} p="4">
        <SelectYear />

        {loading ? (
          <Loader />
        ) : (
          <>
            <Box>
              {window.location.pathname.includes("bar") ? (
                <Box>
                  <BarChart data={salesData} />
                </Box>
              ) : window.location.pathname.includes("line") ? (
                <Box>
                  <LineChart data={salesData} />
                </Box>
              ) : window.location.pathname.includes("pie") ? (
                <Flex maxH={{ xl: "80vh" }} justifyContent={"center"} >
                  <PieChart data={salesData} />
                </Flex>
              ) : (
                <Ecommerce chartData={chartData} topSelling={topSelling} />
              )}
            </Box>
          </>
        )}
      </Box>
    </Box>
  );
};

export default Sidebar;
