import React from "react";
import styled from "styled-components/native";
import { Product } from "../../types/appTypes";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";

interface CartItemProps {
  product: Product;
  quantity: number;
  onRemove: () => void;
}

const CartItem: React.FC<CartItemProps> = ({ product, quantity, onRemove }) => {
  return (
    <Animated.View entering={FadeIn} exiting={FadeOut}>
      <Container>
        <Name>{product.product_name}</Name>
        <Price>
          ${product.price} x {quantity}
        </Price>
        <RemoveButton title="Remove" onPress={onRemove} />
      </Container>
    </Animated.View>
  );
};

const Container = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  border-bottom-width: 1px;
  border-bottom-color: #ccc;
  background-color: #fff;
  border-radius: 10px;
  margin-bottom: 10px;
  elevation: 2;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.25;
  shadow-radius: 3.84px;
`;

const Name = styled.Text`
  font-size: 18px;
  flex: 1;
`;

const Price = styled.Text`
  font-size: 18px;
  color: green;
  margin-right: 10px;
`;

const RemoveButton = styled.Button`
  background-color: #ff4d4d;
  border-radius: 5px;
  padding: 5px 10px;
`;

export default CartItem;
