import React from "react";
import ProductDetails from "../components/products/ProductDetails";
import styled from "styled-components/native";

const ProductScreen: React.FC = () => {
  return (
    <Container>
      <ProductDetails />
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  padding: 10px;
`;

export default ProductScreen;
