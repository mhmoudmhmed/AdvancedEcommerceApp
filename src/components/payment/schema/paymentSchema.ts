import * as yup from "yup";

export const schema = yup.object().shape({
  amount: yup.number().optional(),
  paymentMethod: yup.string().required("Payment method is required"),
  billingAddress: yup.string().required("Billing address is required"),
  cardName: yup.string().required("Card name is required"),
  cardNumber: yup.string().required("Card number is required"),
  cvv: yup.string().required("CVV is required"),
});
