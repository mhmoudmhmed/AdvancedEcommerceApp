import React from "react";
import ProductList from "../components/products/ProductList";
import styled from "styled-components/native";

const HomeScreen: React.FC = () => {
  return (
    <Container>
      <ProductList />
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  padding: 10px;
`;

export default HomeScreen;
