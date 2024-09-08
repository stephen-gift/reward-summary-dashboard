"use client";
import React, { useState } from "react";
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
  Flex,
  Select,
  Input,
  TableContainer,
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverHeader,
  PopoverBody,
} from "@chakra-ui/react";
import { useBookingsStore } from "../../../../store";

const WithdrawalHistory = () => {
  const { withdrawalHistory } = useBookingsStore();

  const [filterMethod, setFilterMethod] = useState("all");
  const [minAmount, setMinAmount] = useState("");
  const [maxAmount, setMaxAmount] = useState("");

  // Filter logic for withdrawal history
  const filteredHistory = withdrawalHistory.filter((withdrawal) => {
    // Log both values for debugging
    console.log("Filter Method:", filterMethod);
    console.log("Withdrawal Method:", withdrawal.method);

    // Compare method for filtering
    const meetsMethodCondition =
      filterMethod === "all" || withdrawal.method === filterMethod;

    // Amount filter logic
    const meetsAmountCondition =
      (!minAmount || withdrawal.amount >= parseFloat(minAmount)) &&
      (!maxAmount || withdrawal.amount <= parseFloat(maxAmount));

    return meetsMethodCondition && meetsAmountCondition;
  });

  return (
    <Box my={8} p={4} borderWidth="1px" borderRadius="lg" boxShadow="md">
      <Text fontSize="2xl" fontWeight="bold" mb={4}>
        Withdrawal History
      </Text>

      <Flex mb={4} justify="space-between" alignItems="center">
        <Popover>
          <PopoverTrigger>
            <Button colorScheme="teal">Filter Withdrawals</Button>
          </PopoverTrigger>
          <PopoverContent>
            <PopoverArrow />
            <PopoverCloseButton />
            <PopoverHeader>Filter Options</PopoverHeader>
            <PopoverBody>
              {/* Filter by Method */}
              <Box mb={4}>
                <Text fontWeight="bold" mb={2}>
                  Filter by Method:
                </Text>
                <Select
                  value={filterMethod}
                  onChange={(e) => setFilterMethod(e.target.value)}
                >
                  <option value="all">All Methods</option>
                  <option value="Direct Cashout">Direct Cashout</option>
                  <option value="Promo Code">Promo Code</option>
                </Select>
              </Box>

              {/* Filter by Amount */}
              <Box mb={4}>
                <Text fontWeight="bold" mb={2}>
                  Filter by Amount:
                </Text>
                <Flex>
                  <Input
                    placeholder="Min ($)"
                    value={minAmount}
                    onChange={(e) => setMinAmount(e.target.value)}
                    width="100px"
                    mr={2}
                    type="number"
                  />
                  <Input
                    placeholder="Max ($)"
                    value={maxAmount}
                    onChange={(e) => setMaxAmount(e.target.value)}
                    width="100px"
                    type="number"
                  />
                </Flex>
              </Box>

              {/* Reset Filters Button */}
              <Button
                onClick={() => {
                  setFilterMethod("all");
                  setMinAmount("");
                  setMaxAmount("");
                }}
                colorScheme="teal"
                width="full"
              >
                Reset Filters
              </Button>
            </PopoverBody>
          </PopoverContent>
        </Popover>
      </Flex>

      {/* Table Section */}
      {filteredHistory.length === 0 ? (
        <Text fontSize="lg" textAlign="center" color="gray.500">
          No withdrawal history available.
        </Text>
      ) : (
        <TableContainer>
          <Table variant="striped">
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
              {filteredHistory.map((withdrawal) => (
                <Tr key={withdrawal.id}>
                  <Td>{withdrawal.id}</Td>
                  <Td>{new Date(withdrawal.date).toLocaleDateString()}</Td>
                  <Td isNumeric>{withdrawal.amount.toFixed(2)}</Td>
                  <Td>{withdrawal.method}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};

export default WithdrawalHistory;
