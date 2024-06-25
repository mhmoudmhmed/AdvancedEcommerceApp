import React, { useEffect } from "react";
import { FlatList, Button } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { RootState } from "../../store";
import { loadCart, removeFromCart } from "../../store/cartSlice";
import CartItem from "./CartItem";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import styled from "styled-components/native";

type RootStackParamList = {
  Payment: undefined;
};

type CartScreenNavigationProp = NavigationProp<RootStackParamList>;

const Cart: React.FC = () => {
  const navigation = useNavigation<CartScreenNavigationProp>();

  const dispatch = useDispatch();
  const cart = useSelector((state: RootState) => state.cart);

  useEffect(() => {
    const loadStoredCart = async () => {
      const storedCart = await AsyncStorage.getItem("cart");
      if (storedCart) {
        dispatch(loadCart(JSON.parse(storedCart)));
      }
    };

    loadStoredCart();
  }, [dispatch]);

  return (
    <Container>
      <FlatList
        data={cart.items}
        keyExtractor={(item) => item.product.id.toString()}
        renderItem={({ item }) => (
          <CartItem
            product={item.product}
            quantity={item.quantity}
            onRemove={() => dispatch(removeFromCart(item.product.id))}
          />
        )}
      />
      <Total>Total: ${cart.total}</Total>
      {cart.total > 0 && (
        <Button
          title="Proceed to Payment"
          onPress={() => navigation.navigate("Payment")}
        />
      )}
    </Container>
  );
};

export const Container = styled.View`
  flex: 1;
  padding: 10px;
`;

export const Total = styled.Text`
  font-size: 20px;
  font-weight: bold;
  text-align: center;
`;

export default Cart;
