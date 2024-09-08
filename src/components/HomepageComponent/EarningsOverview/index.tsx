import BasicStatistics from "@/components/Card/StatsCard";
import Charts from "@/components/Charts";
import { Box } from "@chakra-ui/react";
import React from "react";

const EarningsOverview = () => {
  return (
    <Box>
      <BasicStatistics />
      <Charts />
    </Box>
  );
};

export default EarningsOverview;
