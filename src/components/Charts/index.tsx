import { Box, Heading, SimpleGrid } from "@chakra-ui/react";
import React from "react";
import EarningsLineChart from "./EarningsLineChart";
import CashbackBarChart from "./CashbackBarChart";
import BookingCategoryPieChart from "./BookingCategoryPieChart";

const Charts = () => {
  return (
    <Box py={10}>
      <Box mb={10}>
        <Heading as="h1" size="lg">
          Rewards Dashboard
        </Heading>
      </Box>

      <SimpleGrid columns={{ base: 1, md: 1, lg: 2 }} spacing={10}>
        <EarningsLineChart />
        <CashbackBarChart />
        <BookingCategoryPieChart />
      </SimpleGrid>
    </Box>
  );
};

export default Charts;
