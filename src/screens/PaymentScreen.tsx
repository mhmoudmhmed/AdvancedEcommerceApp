import React from "react";
import Payment from "../components/payment/Payment";
import styled from "styled-components/native";

const PaymentScreen: React.FC = () => {
  return (
    <Container>
      <Payment />
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  padding: 10px;
`;

export default PaymentScreen;
