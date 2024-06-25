import React from "react";
import { Button } from "react-native";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import styled from "styled-components/native";

type RootStackParamList = {
  Cart: undefined;
};

type ProductDetailsScreenNavigationProp = NavigationProp<RootStackParamList>;

const HeaderCartButton = () => {
  const navigation = useNavigation<ProductDetailsScreenNavigationProp>();

  return (
    <CartButton onPress={() => navigation.navigate("Cart")}>
      <CartText>Cart</CartText>
    </CartButton>
  );
};

const CartButton = styled.TouchableOpacity`
  padding: 4px;
  background-color: #007aff;
  border-radius: 5px;
  width: 70px;
`;

const CartText = styled.Text`
  color: white;
  font-size: 16px;
  text-align: center;
`;

export default HeaderCartButton;
