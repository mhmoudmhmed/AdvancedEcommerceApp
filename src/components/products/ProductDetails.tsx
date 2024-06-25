import React from "react";
import { Text, Button } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store";
import { useNavigation, useRoute } from "@react-navigation/native";
import styled from "styled-components/native";
import { addToCart } from "../../store/cartSlice";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import HeaderCartButton from "../HeaderCartButton";
import Header from "../header";
import Toast from "react-native-toast-message";

const ProductDetails: React.FC = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const { productId } = (route.params as { productId: number }) || {};
  const product = useSelector((state: RootState) =>
    state.products.items.find((item) => item.id === productId)
  );

  if (!product) {
    return <Text>Product not found</Text>;
  }

  const handleAddToCart = () => {
    dispatch(addToCart(product));
    Toast.show({
      type: "success",
      position: "top",
      text1: "Item added to cart",
      text2: `${product.product_name} has been added to your cart.`,
      visibilityTime: 4000,
      autoHide: true,
      topOffset: 30,
      bottomOffset: 40,
    });
  };

  return (
    <Container>
      <HeaderContainer>
        <BackButton title="Back" onPress={() => navigation.goBack()} />
        <Header title="Product Details" />
        <HeaderCartButton />
      </HeaderContainer>
      <Animated.View entering={FadeIn} exiting={FadeOut}>
        <ProductImage source={{ uri: product.image }} />
      </Animated.View>
      <Animated.View entering={FadeIn.delay(200)} exiting={FadeOut}>
        <Name>{product.product_name}</Name>
      </Animated.View>
      <Animated.View entering={FadeIn.delay(400)} exiting={FadeOut}>
        <Price>${product.price}</Price>
      </Animated.View>
      <Animated.View entering={FadeIn.delay(600)} exiting={FadeOut}>
        <Description>{product.description}</Description>
      </Animated.View>
      <Spacer />
      <Animated.View entering={FadeIn.delay(800)} exiting={FadeOut}>
        <AddToCartButton title="Add to Cart" onPress={handleAddToCart} />
      </Animated.View>
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  padding: 10px;
`;

const HeaderContainer = styled.View`
  flex-direction: row;
  align-items: baseline;
  justify-content: space-between;
  margin-top: 10px;
  margin-bottom: 20px;
`;

const ProductImage = styled.Image`
  width: 100%;
  height: 300px;
  border-radius: 10px;
`;

const Name = styled.Text`
  font-size: 24px;
  font-weight: bold;
  margin-top: 10px;
`;

const Price = styled.Text`
  font-size: 20px;
  color: green;
  margin-top: 5px;
`;

const Description = styled.Text`
  font-size: 16px;
  color: #666;
  margin-top: 10px;
`;

const Spacer = styled.View`
  height: 20px;
`;

const AddToCartButton = styled.Button`
  margin-top: 20px;
`;

const BackButton = styled.Button`
  margin-right: 10px;
`;

export default ProductDetails;
