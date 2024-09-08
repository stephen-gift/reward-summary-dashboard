import React, { useState } from "react";
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Text,
  IconButton,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  FormControl,
  FormLabel,
  useDisclosure,
  Select,
} from "@chakra-ui/react";
import { Booking, useBookingsStore } from "../../../../store";
import { BiEdit } from "react-icons/bi";
import { MdDelete } from "react-icons/md";

const cashbackRate = 0.015;

const CashbackHistory = () => {
  const { bookings, updateBooking, removeBooking, stats } = useBookingsStore();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [currentBooking, setCurrentBooking] = useState<Booking>();
  const [editedDetails, setEditedDetails] = useState<string>("");
  const [editedCategory, setEditedCategory] = useState<string>("");

  const handleEdit = (bookingId: string) => {
    const bookingToEdit = bookings.find((booking) => booking.id === bookingId);
    if (bookingToEdit) {
      setCurrentBooking(bookingToEdit);
      setEditedDetails(bookingToEdit.bookingDetails);
      setEditedCategory(bookingToEdit.category);
      onOpen();
    }
  };

  const handleSave = () => {
    if (currentBooking) {
      const updatedBooking = {
        ...currentBooking,
        bookingDetails: editedDetails,
        category: editedCategory,
      };
      updateBooking(updatedBooking);
    }
    onClose();
  };

  const handleDelete = (bookingId: string) => {
    removeBooking(bookingId);
  };

  return (
    <Box my={8} p={4} borderWidth="1px" borderRadius="lg" boxShadow="md">
      <Text fontSize="2xl" fontWeight="bold" mb={4}>
        Cashback History
      </Text>
      <TableContainer>
        <Table variant="striped" colorScheme="teal">
          <Thead>
            <Tr>
              <Th>Transaction Date</Th>
              <Th>Total Booking Amount ($)</Th>
              <Th>Booking Details</Th>
              <Th>Category</Th>
              <Th>Cashback Earned ($)</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {bookings.map((booking) => {
              const sanitizedAmount = String(
                booking.totalBookingAmount
              ).replace(/[^0-9.-]+/g, "");
              const totalBookingAmount = parseFloat(sanitizedAmount);
              const cashbackEarned = (
                totalBookingAmount * cashbackRate
              ).toFixed(2);

              return (
                <Tr key={booking.id}>
                  <Td>{booking.transactionDate}</Td>
                  <Td>{booking.totalBookingAmount}</Td>
                  <Td>{booking.bookingDetails}</Td>
                  <Td>{booking.category}</Td>
                  <Td>{cashbackEarned}</Td>
                  <Td>
                    <IconButton
                      aria-label="Edit Booking"
                      icon={<BiEdit />}
                      onClick={() => handleEdit(booking.id)}
                      mr={2}
                    />
                    <IconButton
                      aria-label="Delete Booking"
                      icon={<MdDelete />}
                      colorScheme="red"
                      onClick={() => handleDelete(booking.id)}
                    />
                  </Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>
      <Box mt={4} p={4} borderWidth="1px" borderRadius="md">
        <Text fontSize="lg" fontWeight="bold">
          Total Cashback: ${stats.totalCashback.toFixed(2)}
        </Text>
      </Box>

      {/* Modal for editing booking details */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Booking Details</ModalHeader>
          <ModalBody>
            <FormControl mb={4}>
              <FormLabel>Category</FormLabel>
              <Select
                value={editedCategory}
                onChange={(e) => setEditedCategory(e.target.value)}
              >
                <option value="" label="Select category" />
                <option value="Travel" label="Travel" />
                <option value="Transport" label="Transport" />
                <option value="Entertainment" label="Entertainment" />
                <option value="Food" label="Food" />
                <option value="Wellness" label="Wellness" />
                <option value="Sports" label="Sports" />
                {/* Add more categories as needed */}
              </Select>
            </FormControl>
            <FormControl mb={4}>
              <FormLabel>Booking Details</FormLabel>
              <Input
                value={editedDetails}
                onChange={(e) => setEditedDetails(e.target.value)}
                placeholder="Enter updated booking details"
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleSave}>
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default CashbackHistory;
