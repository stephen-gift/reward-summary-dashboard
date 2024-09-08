import {
  Box,
  Heading,
  Select,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { useState } from "react";
import { useBookingsStore } from "../../../../store";

const EarningsLineChart = () => {
  const { processBookings } = useBookingsStore();

  const { transformedData, cashbackData } = processBookings();

  const [dataType, setDataType] = useState<"earnings" | "cashback">("earnings");

  const data = dataType === "cashback" ? cashbackData : transformedData;
  const dataKey = dataType === "cashback" ? "cashback" : "amount";

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setDataType(event.target.value as "earnings" | "cashback");
  };

  const bg = useColorModeValue("white", "gray.800");
  const textColor = useColorModeValue("gray.800", "white");
  const lineColor = useColorModeValue("#3182CE", "#90CDF4");
  return (
    <Box
      maxW="full"
      bg={bg}
      shadow="md"
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
        <Heading flex={1} as="h3" size="md" textAlign="start" color={textColor}>
          Monthly{" "}
          {dataType === "cashback" ? "Cashback" : "Transaction Earnings"}
        </Heading>

        <Select
          flex={1}
          placeholder="Select Data Type"
          value={dataType}
          onChange={handleChange}
          width="fit-content"
          mx="auto"
          color={textColor}
        >
          <option value="earnings">Transaction Earnings</option>
          <option value="cashback">Cashback</option>
        </Select>
      </Stack>
      {data.length > 0 ? (
        <ResponsiveContainer width="100%" height={400}>
          <LineChart
            data={data}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3"  />
            <XAxis dataKey="date" />
            <YAxis
              tickFormatter={(value) => `$${value.toFixed(2)}`}
              stroke={textColor}
            />
            <Tooltip
              formatter={(value: number) => `$${value}`}
              contentStyle={{
                backgroundColor: `${bg}`,
                color: textColor,
              }}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey={dataKey}
              stroke={lineColor}
              strokeWidth={2}
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      ) : (
        <Text textAlign="center" color="gray.600">
          No data available for the selected period.
        </Text>
      )}
    </Box>
  );
};

export default EarningsLineChart;
