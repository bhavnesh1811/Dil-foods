import { Flex, Select } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const SelectYear = () => {
  const [searchParams, setSearchParms] = useSearchParams();
  const [year, setCurrentYear] = useState(searchParams.get("year") || "2020");

  useEffect(() => {
    setCurrentYear(searchParams.get("year") || "2020");
  }, [searchParams]);
  return (
    <Flex
      gap={"12px"}
      fontSize={{ base: "16px", md: "24px", lg: "32px" }}
      p={"12px 20px"}
      cursor={"pointer"}
      alignItems={"center"}
    >
      <Select
      placeholder="Select Year"
        value={year}
        onChange={(e) => setSearchParms({ year: e.target.value })}
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
