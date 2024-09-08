import React from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useBookingsStore } from "../../../../store";

const validationSchema = Yup.object({
  bookingDetails: Yup.string().required("Booking details are required"),
  totalBookingAmount: Yup.number()
    .required("Total booking amount is required")
    .positive("Amount must be positive")
    .min(0, "Amount cannot be negative"),
  category: Yup.string().required("Category is required"),
});

interface BookingFormValues {
  bookingDetails: string;
  totalBookingAmount: string;
  category: string;
}

const ManageBookings = () => {
  const toast = useToast();
  const { addBooking } = useBookingsStore();

  const handleSubmit = (
    values: BookingFormValues,
    { resetForm }: { resetForm: () => void }
  ) => {
    const newBooking = {
      id: Math.random().toString(36).substring(7),
      transactionDate: new Date().toISOString().split("T")[0],
      ...values,
    };

    addBooking(newBooking);
    toast({
      title: "Booking Added",
      description: `Booking details: ${values.bookingDetails}`,
      status: "success",
      duration: 5000,
      isClosable: true,
    });

    resetForm();
  };

  return (
    <Box
      my={8}
      p={4}
      borderWidth="1px"
      borderRadius="lg"
      boxShadow="md"
    >
      <Text fontSize="2xl" fontWeight="bold" mb={4}>
        Manage Bookings
      </Text>
      <Formik
        initialValues={{
          bookingDetails: "",
          totalBookingAmount: "",
          category: "",
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched }) => (
          <Form>
            <Stack spacing={4}>
              <FormControl
                isInvalid={!!errors.bookingDetails && touched.bookingDetails}
              >
                <FormLabel htmlFor="bookingDetails">Booking Details</FormLabel>
                <Field
                  as={Input}
                  id="bookingDetails"
                  name="bookingDetails"
                  type="text"
                />
                {errors.bookingDetails && touched.bookingDetails ? (
                  <Text color="red.500">{errors.bookingDetails}</Text>
                ) : null}
              </FormControl>
              <FormControl
                isInvalid={
                  !!errors.totalBookingAmount && touched.totalBookingAmount
                }
              >
                <FormLabel htmlFor="totalBookingAmount">
                  Total Booking Amount
                </FormLabel>
                <Field
                  as={Input}
                  id="totalBookingAmount"
                  name="totalBookingAmount"
                  type="number"
                  step="0.01"
                />
                {errors.totalBookingAmount && touched.totalBookingAmount ? (
                  <Text color="red.500">{errors.totalBookingAmount}</Text>
                ) : null}
              </FormControl>
              <FormControl isInvalid={!!errors.category && touched.category}>
                <FormLabel htmlFor="category">Category</FormLabel>
                <Field as={Select} id="category" name="category">
                  <option value="" label="Select category" />
                  <option value="Travel" label="Travel" />
                  <option value="Transport" label="Transport" />
                  <option value="Entertainment" label="Entertainment" />
                  <option value="Food" label="Food" />
                  <option value="Wellness" label="Wellness" />
                  <option value="Sports" label="Sports" />
                </Field>
                {errors.category && touched.category ? (
                  <Text color="red.500">{errors.category}</Text>
                ) : null}
              </FormControl>
              <Button colorScheme="teal" type="submit">
                Add Booking
              </Button>
            </Stack>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default ManageBookings;
