import React from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  Box,
  Text,
} from "@chakra-ui/react";
import { useBookingsStore } from "../../../../store";

const WithdrawalHistory = () => {
  const { withdrawalHistory } = useBookingsStore();

  return (
    <Box
      my={8}
      p={4}
      borderWidth="1px"
      borderRadius="lg"
      boxShadow="md"
      bg="white"
    >
      <Text fontSize="2xl" fontWeight="bold" mb={4}>
        Withdrawal History
      </Text>
      <Table variant="simple">
        <TableCaption>Your previous withdrawal transactions</TableCaption>
        <Thead>
          <Tr>
            <Th>ID</Th>
            <Th>Date</Th>
            <Th isNumeric>Amount ($)</Th>
            <Th>Method</Th>
          </Tr>
        </Thead>
        <Tbody>
          {withdrawalHistory.length === 0 ? (
            <Tr>
              <Td colSpan={4} textAlign="center">
                No withdrawal history available.
              </Td>
            </Tr>
          ) : (
            withdrawalHistory.map((withdrawal) => (
              <Tr key={withdrawal.id}>
                <Td>{withdrawal.id}</Td>
                <Td>{new Date(withdrawal.date).toLocaleDateString()}</Td>
                <Td isNumeric>{withdrawal.amount.toFixed(2)}</Td>
                <Td>{withdrawal.method}</Td>
              </Tr>
            ))
          )}
        </Tbody>
      </Table>
    </Box>
  );
};

export default WithdrawalHistory;
