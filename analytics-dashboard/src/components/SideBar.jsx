import React, { useEffect, useState } from "react";
import { FiShoppingBag } from "react-icons/fi";
import { FaChartPie, FaChartBar, FaChartLine } from "react-icons/fa";
import {
  Avatar,
  Box,
  CloseButton,
  Flex,
  Icon,
  useColorModeValue,
  Drawer,
  DrawerContent,
  useDisclosure,
  Heading,
} from "@chakra-ui/react";
import BarChart from "./BarChart";
import LineChart from "./LineChart";
import PieChart from "./PieChart";
import { useDispatch, useSelector } from "react-redux";
import { Link, useSearchParams } from "react-router-dom";
import { getData } from "../redux/chartData/chartData.action";
import Loader from "./Loader";
import SelectYear from "./SelectYear";
import Ecommerce from "./Ecommerce";
import MobileNav from "./MobileNav";

const LinkItems = [
  { name: "Ecommerce", icon: FiShoppingBag },
  { name: "Pie", icon: FaChartPie },
  { name: "Bar", icon: FaChartBar },
  { name: "Line", icon: FaChartLine },
];

const SidebarContent = ({ onClose, ...rest }) => {
  return (
    <Box
      transition="3s ease"
      bg={useColorModeValue("white", "gray.900")}
      borderRight="1px"
      borderRightColor={useColorModeValue("gray.200", "gray.700")}
      w={{ base: "full", md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
      <Avatar
        size="lg"
        src="https://res.cloudinary.com/ddkuxmjmv/image/upload/v1708516522/ls1t08lktposoobdp6ka.png"
        alt="logo"
      />
        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>
      {LinkItems.map((link) => (
        <Link to={`/${link.name.toLowerCase()}`}>
          <NavItem key={link.name} icon={link.icon}>
            {link.name}
          </NavItem>
        </Link>
      ))}
    </Box>
  );
};

const NavItem = ({ icon, children, ...rest }) => {
  return (
    <Box
      as="a"
      href="#"
      style={{ textDecoration: "none" }}
      _focus={{ boxShadow: "none" }}
    >
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: "cyan.400",
          color: "white",
        }}
        {...rest}
      >
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: "white",
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Box>
  );
};



const Sidebar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useDispatch();
  const { loading, chartData } = useSelector((store) => store.chartData);
  const [searchParams] = useSearchParams();
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
    setCurrentYear(searchParams.get("year") || "2020");
  }, [searchParams]);

  return (
    <Box minH="100vh" bg={useColorModeValue("gray.100", "gray.900")}>
      <SidebarContent
        onClose={() => onClose()}
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
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <MobileNav onOpen={onOpen} />
      <Box ml={{ base: 0, md: 60 }} p="4">
        <Heading my={"12px"}>Analytics DashBoard</Heading>
        {loading ? (
          <Loader />
        ) : (
          <>
            <Flex justifyContent={{ base: "flex-start", lg: "space-between" }}>
              <SelectYear />
            </Flex>
            <Flex maxH={{xl:"60vh"}} h={"60vh"}>
              {window.location.pathname.includes("bar") ? (
                <BarChart data={salesData} />
              ) : window.location.pathname.includes("line") ? (
                <LineChart data={salesData} />
              ) : window.location.pathname.includes("pie") ? (
                <PieChart data={salesData} />
              ) : (
                <Ecommerce chartData={chartData} />
              )}
            </Flex>
          </>
        )}
      </Box>
    </Box>
  );
};

export default Sidebar;
