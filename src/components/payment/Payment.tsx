import React from "react";
import { Button } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { clearCart } from "../../store/cartSlice";
import MockPaymentGateway from "./MockPaymentGateway";
import styled from "styled-components/native";

const Payment: React.FC = () => {
  const dispatch = useDispatch();
  const total = useSelector((state: RootState) => state.cart.total);

  const handlePayment = async () => {
    const success = await MockPaymentGateway.processPayment(total);
    if (success) {
      dispatch(clearCart());
      alert("Payment successful!");
    } else {
      alert("Payment failed. Please try again.");
    }
  };

  return (
    <Container>
      <Total>Total: ${total}</Total>
      <Button title="Pay Now" onPress={handlePayment} />
    </Container>
  );
};

export const Container = styled.View`
  flex: 1;
  padding: 10px;
  justify-content: center;
  align-items: center;
`;

export const Total = styled.Text`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 20px;
`;

export default Payment;
