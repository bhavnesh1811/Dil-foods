import { Flex, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { FaChartPie, FaChartBar, FaChartLine } from "react-icons/fa";
import { useSearchParams } from "react-router-dom";

const SelectChart = () => {
  const [searchParams, setSearchParms] = useSearchParams();
  const [currentIndex, setCurrentIndex] = useState(
    searchParams.get("charttype") || "bar"
  );

  useEffect(() => {
    setCurrentIndex(searchParams.get("charttype") || "bar");
  }, [searchParams]);
  return (
    <Flex
      gap={"12px"}
      fontSize={{ base: "16px", md: "24px"}}
      p={"12px 20px"}
      cursor={"pointer"}
      alignItems={"center"}
    >
      <Text>Select Chart :</Text>
      <FaChartLine
        color={currentIndex === "line" ? "green" : "red"}
        onClick={() => setSearchParms({ charttype: "line" })}
      />
      <FaChartBar
        color={currentIndex === "bar" ? "green" : "red"}
        onClick={() => setSearchParms({ charttype: "bar" })}
      />
      <FaChartPie
        color={currentIndex === "pie" ? "green" : "red"}
        onClick={() => setSearchParms({ charttype: "pie" })}
      />
    </Flex>
  );
};

export default SelectChart;
