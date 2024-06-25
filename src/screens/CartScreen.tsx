import React from "react";
import Cart from "../components/cart/Cart";
import styled from "styled-components/native";

const CartScreen: React.FC = () => {
  return (
    <Container>
      <Cart />
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  padding: 10px;
`;

export default CartScreen;
