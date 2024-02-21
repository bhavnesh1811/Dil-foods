import { Avatar, Box, CloseButton, Flex, useColorModeValue } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";
import NavItem from "./NavItem";
import { FiShoppingBag } from "react-icons/fi";
import { FaChartPie, FaChartBar, FaChartLine } from "react-icons/fa";

const LinkItems = [
  { name: "Ecommerce", icon: FiShoppingBag },
  { name: "Pie", icon: FaChartPie },
  { name: "Bar", icon: FaChartBar },
  { name: "Line", icon: FaChartLine },
];

const SideBarContent = ({ onClose, ...rest }) => {
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
        <Link to={`/${link.name.toLowerCase()}`} onClick={() => onClose()}>
          <NavItem key={link.name} icon={link.icon}>
            {link.name}
          </NavItem>
        </Link>
      ))}
    </Box>
  );
};

export default SideBarContent;
