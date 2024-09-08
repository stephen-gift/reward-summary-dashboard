import React from "react";
import {
  Box,
  Button,
  Divider,
  FormControl,
  FormLabel,
  Input,
  Select,
  Stack,
  Text,
  useToast,
  FormErrorMessage,
} from "@chakra-ui/react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useBookingsStore } from "../../../../store";

const CashoutOptions = () => {
  const { withdrawableCashback, setWithdrawableCashback, addWithdrawal } =
    useBookingsStore();
  const toast = useToast();

  const availableCashback = withdrawableCashback;

  const promoCodes: { [key: string]: number } = {
    SAVE10: 10,
    BONUS20: 20,
  };

  const validationSchema = Yup.object().shape({
    cashoutAmount: Yup.number()
      .required("Cashout amount is required")
      .min(1, "Cashout amount must be at least $1")
      .max(
        availableCashback,
        `Cashout amount cannot exceed available balance of $${availableCashback}`
      ),

    selectedMethod: Yup.string().required("Cashout method is required"),

    promoCode: Yup.string().when("selectedMethod", {
      is: (value: string) => value === "promo",
      then: (schema) => schema.required("Promo code is required"),
      otherwise: (schema) => schema.notRequired(),
    }),
  });

  const handleCashout = (
    values: {
      cashoutAmount: string;
      selectedMethod: string;
      promoCode: string;
    },
    { resetForm }: { resetForm: () => void }
  ) => {
    if (availableCashback < parseFloat(values.cashoutAmount)) {
      toast({
        title: "Insufficient Cashback",
        description: `You do not have enough cashback to complete this request. Available cashback: $${availableCashback.toFixed(
          2
        )}`,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
      return;
    }

    let cashbackToDeduct = parseFloat(values.cashoutAmount);

    if (values.selectedMethod === "promo") {
      const promoBonus = promoCodes[values.promoCode.toUpperCase()];
      if (!promoBonus) {
        toast({
          title: "Invalid Promo Code",
          description: `The promo code "${values.promoCode}" is invalid.`,
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "top-right",
        });
        return;
      }

      cashbackToDeduct -= cashbackToDeduct * (promoBonus / 100);

      toast({
        title: "Promo Code Applied",
        description: `Promo code "${values.promoCode}" applied. You received a ${promoBonus}% bonus on your cashback!`,
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
    }

    const newCashback = availableCashback - cashbackToDeduct;
    setWithdrawableCashback(newCashback);

    const newWithdrawal = {
      id: Date.now().toString(), // Unique ID
      date: new Date().toISOString(),
      amount: cashbackToDeduct,
      method:
        values.selectedMethod === "direct" ? "Direct Cashout" : "Promo Code",
    };

    addWithdrawal(newWithdrawal);

    toast({
      title: "Cashout Request Submitted",
      description: `You have requested to cash out $${cashbackToDeduct} via ${
        values.selectedMethod === "direct" ? "Direct Cashout" : "Promo Code"
      }.`,
      position: "top-right",
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
      bg="white"
    >
      <Text fontSize="2xl" fontWeight="bold" mb={4}>
        Cashout Options
      </Text>
      <Formik
        initialValues={{
          cashoutAmount: "",
          selectedMethod: "direct",
          promoCode: "",
        }}
        validationSchema={validationSchema}
        onSubmit={handleCashout}
      >
        {({ values, handleChange, handleSubmit }) => (
          <Form onSubmit={handleSubmit}>
            <Stack spacing={4}>
              <FormControl isInvalid={!!ErrorMessage.name}>
                <FormLabel htmlFor="cashoutAmount">
                  Cashout Amount ($)
                </FormLabel>
                <Field
                  as={Input}
                  id="cashoutAmount"
                  name="cashoutAmount"
                  type="number"
                  onChange={handleChange}
                  value={values.cashoutAmount}
                />
                <FormErrorMessage>
                  <ErrorMessage name="cashoutAmount" />
                </FormErrorMessage>
              </FormControl>

              <FormControl>
                <FormLabel htmlFor="cashoutMethod">Cashout Method</FormLabel>
                <Field
                  as={Select}
                  id="cashoutMethod"
                  name="selectedMethod"
                  onChange={handleChange}
                  value={values.selectedMethod}
                >
                  <option value="direct">Direct Cashout</option>
                  <option value="promo">Promo Code</option>
                </Field>
                <FormErrorMessage>
                  <ErrorMessage name="selectedMethod" />
                </FormErrorMessage>
              </FormControl>

              {values.selectedMethod === "promo" && (
                <FormControl isInvalid={!!ErrorMessage.name}>
                  <FormLabel htmlFor="promoCode">Promo Code</FormLabel>
                  <Field
                    as={Input}
                    id="promoCode"
                    name="promoCode"
                    type="text"
                    onChange={handleChange}
                    value={values.promoCode}
                  />
                  <FormErrorMessage>
                    <ErrorMessage name="promoCode" />
                  </FormErrorMessage>
                </FormControl>
              )}

              <Divider />
              <Button colorScheme="teal" type="submit">
                Submit Cashout Request
              </Button>
            </Stack>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default CashoutOptions;
