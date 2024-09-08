import React, { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { Box, Heading, Select, Stack, Text, useColorModeValue } from "@chakra-ui/react";
import { useBookingsStore } from "../../../../store";

const CashbackBarChart = () => {
  const { processBookings } = useBookingsStore();
  const { cashbackData, transformedData } = processBookings();

  const [dataType, setDataType] = useState<"cashback" | "earnings">("cashback");

  const data = dataType === "cashback" ? cashbackData : transformedData;
  const dataKey = dataType === "cashback" ? "cashback" : "amount";

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setDataType(event.target.value as "cashback" | "earnings");
  };

  // Define color modes for light and dark themes
  const bgColor = useColorModeValue("white", "gray.800");
  const textColor = useColorModeValue("gray.600", "gray.200");
  const barColorCashback = useColorModeValue("#4CAF50", "#81C784"); // Adjust for dark mode
  const barColorEarnings = useColorModeValue("#3182CE", "#63B3ED"); // Adjust for dark mode
  const boxShadow = useColorModeValue("md", "dark-lg");

  return (
    <Box
      bg={bgColor}
      shadow={boxShadow}
      p={4}
      borderWidth="1px"
      rounded="lg"
      overflow="hidden"
    >
      <Stack
        direction={["column", "row"]}
        spacing={2}
        w={"full"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Heading flex={1} as="h3" size="md" textAlign="center" color={textColor}>
          Monthly{" "}
          {dataType === "cashback" ? "Cashback Amount" : "Transaction Earnings"}
        </Heading>
        <Select
          flex={1}
          placeholder="Select Data Type"
          value={dataType}
          onChange={handleChange}
          width="fit-content"
          mx="auto"
        >
          <option value="earnings">Transaction Earnings</option>
          <option value="cashback">Cashback</option>
        </Select>
      </Stack>
      {data.length > 0 ? (
        <ResponsiveContainer width="100%" height={400}>
          <BarChart
            data={data}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis tickFormatter={(value) => `$${value.toFixed(2)}`} />
            <Tooltip formatter={(value) => `$${value}`} />
            <Legend />
            <Bar
              dataKey={dataKey}
              fill={dataType === "cashback" ? barColorCashback : barColorEarnings}
            />
          </BarChart>
        </ResponsiveContainer>
      ) : (
        <Text textAlign="center" color={textColor}>
          No cashback data available for the selected period.
        </Text>
      )}
    </Box>
  );
};

export default CashbackBarChart;
