import { Flex, Select, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const SelectYear = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [year, setCurrentYear] = useState(searchParams.get("year") || "2020");

  useEffect(() => {
    setCurrentYear(searchParams.get("year") || "2020");
  }, [searchParams]);
  return (
    <Flex gap={"12px"} cursor={"pointer"} alignItems={"center"}>
      <Text as="span">Select Year : </Text>
      <Select
        maxW={{base:"30%",md:"20%"}}
        value={year}
        onChange={(e) => setSearchParams({ year: e.target.value })}
      >
        
        <option value="2020">2020</option>
        <option value="2021">2021</option>
        <option value="2022">2022</option>
        <option value="2023">2023</option>
      </Select>
    </Flex>
  );
};

export default SelectYear;
