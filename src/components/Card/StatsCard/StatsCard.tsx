import {
  Box,
  Flex,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  useColorModeValue,
} from "@chakra-ui/react";
import { ReactNode } from "react";

interface StatsCardProps {
  title: string;
  stat: string;
  icon: ReactNode;
  helpText?: string;
  arrowType?: "increase" | "decrease";
}

export default function StatsCard({
  title,
  stat,
  icon,
  helpText = "",
  arrowType,
}: StatsCardProps) {
  return (
    <Stat
      px={{ base: 2, md: 4 }}
      py={{ base: 3, md: 5 }}
      shadow={"xl"}
      border={"1px solid"}
      borderColor={useColorModeValue("gray.800", "gray.500")}
      rounded={"lg"}
    >
      <Flex justifyContent={"space-between"} gap={2}>
        <Box>
          <StatLabel fontWeight={"medium"} isTruncated>
            {title}
          </StatLabel>
          <StatNumber
            fontSize={{ base: "lg", md: "2xl" }}
            fontWeight={"medium"}
          >
            {stat}
          </StatNumber>
          <StatHelpText>
            {arrowType && <StatArrow type={arrowType} />}
            {helpText}
          </StatHelpText>
        </Box>
        <Box
          my={"auto"}
          color={useColorModeValue("gray.800", "gray.200")}
          alignContent={"center"}
        >
          {icon}
        </Box>
      </Flex>
    </Stat>
  );
}
