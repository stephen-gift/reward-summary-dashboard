import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieLabelRenderProps,
} from "recharts";
import { Box, Heading, useColorModeValue } from "@chakra-ui/react";
import { useBookingsStore } from "../../../../store";

interface Payload {
  name: string;
  value: number;
  percent: number;
}

interface CustomTooltipProps {
  payload?: { payload: Payload }[];
  label?: string;
}

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const BookingCategoryPieChart = () => {
  const bgColor = useColorModeValue("white", "gray.800");
  const textColor = useColorModeValue("gray.600", "gray.200");
  const boxShadow = useColorModeValue("md", "dark-lg");

  const { bookings } = useBookingsStore();

  console.log("Bookings from store:", bookings);

  if (!bookings || bookings.length === 0) {
    return <p>No bookings available to display.</p>;
  }

  const categoryData = bookings.reduce<Record<string, number>>(
    (acc, booking) => {
      const category = booking.category || "Unknown"; // Fallback if category is undefined
      acc[category] = (acc[category] || 0) + 1;
      return acc;
    },
    {}
  );

  console.log("Category data:", categoryData);

  const data = Object.entries(categoryData).map(([name, value]) => ({
    name,
    value,
    percent: value / bookings.length,
  }));

  const RADIAN = Math.PI / 180;

  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent = 0,
  }: PieLabelRenderProps) => {
    const centerX = typeof cx === "number" ? cx : 0;
    const centerY = typeof cy === "number" ? cy : 0;
    const innerR = typeof innerRadius === "number" ? innerRadius : 0;
    const outerR = typeof outerRadius === "number" ? outerRadius : 0;

    const radius = innerR + (outerR - innerR) * 0.5;
    const x = centerX + radius * Math.cos(-midAngle * RADIAN);
    const y = centerY + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        fontSize="12px"
        textAnchor={x > centerX ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <Box
      bg={bgColor}
      shadow={boxShadow}
      borderWidth="1px"
      rounded="lg"
      overflow="hidden"
      p={4}
    >
      <Heading as="h3" size="md" textAlign="center" mb={5} color={textColor}>
        Cashback by Booking Category
      </Heading>
      <ResponsiveContainer width="100%" height={400}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={150}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default BookingCategoryPieChart;

const CustomTooltip = ({ payload }: CustomTooltipProps) => {
  const bgColor = useColorModeValue("#fff", "#2D3748");
  const borderColor = useColorModeValue("#ccc", "#4A5568");
  const textColor = useColorModeValue("black", "white");

  if (!payload || payload.length === 0) {
    return null;
  }

  const { name, value, percent } = payload[0].payload;

  return (
    <div
      style={{
        backgroundColor: bgColor,
        border: `1px solid ${borderColor}`,
        padding: "10px",
        borderRadius: "4px",
        color: textColor,
      }}
    >
      <p style={{ margin: 0 }}>{`Category: ${name}`}</p>
      <p style={{ margin: 0 }}>{`Value: ${value}`}</p>
      <p style={{ margin: 0 }}>{`Percentage: ${(percent * 100).toFixed(
        0
      )}%`}</p>
    </div>
  );
};
