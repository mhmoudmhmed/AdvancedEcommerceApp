import React, { useCallback, useState } from "react";
import { ActivityIndicator, FlatList, TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { useSelector } from "react-redux";
import { fetchProducts } from "../../store/productsSlice";
import { RootState, useAppDispatch } from "../../store";
import {
  NavigationProp,
  useFocusEffect,
  useNavigation,
} from "@react-navigation/native";
import { Product } from "../../types/appTypes";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import { useDispatch } from "react-redux";
import { logout } from "../../store/authSlice";
import Header from "../header";
import NetInfo from "@react-native-community/netinfo";

type RootStackParamList = {
  ProductDetails: { productId: number };
  Login: undefined;
};

type ProductScreenNavigationProp = NavigationProp<RootStackParamList>;

const ProductList: React.FC = () => {
  const navigation = useNavigation<ProductScreenNavigationProp>();
  const dispatch = useAppDispatch();
  const products = useSelector((state: RootState) => state.products.items);
  const authDispatch = useDispatch();
  const [isLoading, setIsLoading] = useState<Boolean>(true);

  useFocusEffect(
    useCallback(() => {
      const fetchData = async () => {
        setIsLoading(true);
        await dispatch(fetchProducts());
        setIsLoading(false);
      };

      const unsubscribe = NetInfo.addEventListener((state) => {
        if (state.isConnected) {
          fetchData();
        }
      });

      return () => unsubscribe();
    }, [dispatch])
  );

  const handleLogout = async () => {
    try {
      await authDispatch(logout());
      navigation.navigate("Login");
    } catch (error) {
      console.error("Failed to logout:", error);
    }
  };

  const renderProductItem = ({ item }: { item: Product }) => (
    <Animated.View entering={FadeIn} exiting={FadeOut}>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("ProductDetails", { productId: item.id })
        }
        key={`product-${item.id}`}
      >
        <ProductCard>
          <ProductImage source={{ uri: item.image }} />
          <ProductName>{item.product_name}</ProductName>
          <ProductPrice>${item.price}</ProductPrice>
          <ProductDescription>{item.description}</ProductDescription>
        </ProductCard>
      </TouchableOpacity>
    </Animated.View>
  );

  if (isLoading) {
    return (
      <LoaderContainer>
        <ActivityIndicator size="large" color="#0000ff" />
      </LoaderContainer>
    );
  }

  return (
    <Container>
      <Header title="Products" />
      <LogoutButton onPress={handleLogout}>
        <LogoutText>Logout</LogoutText>
      </LogoutButton>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderProductItem}
      />
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  padding: 10px;
`;

const ProductCard = styled.View`
  padding: 15px;
  margin: 10px;
  border: 1px solid #ccc;
  border-radius: 10px;
  background-color: white;
  elevation: 3;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.25;
  shadow-radius: 3.84px;
`;

const LoaderContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const ProductImage = styled.Image`
  width: 100%;
  height: 200px;
  border-radius: 10px;
`;

const ProductName = styled.Text`
  font-size: 20px;
  font-weight: bold;
  margin-top: 10px;
`;

const ProductPrice = styled.Text`
  font-size: 18px;
  color: green;
  margin-top: 5px;
`;

const ProductDescription = styled.Text`
  font-size: 14px;
  color: #666;
  margin-top: 10px;
`;

const LogoutButton = styled.TouchableOpacity`
  padding: 10px;
  align-self: flex-end;
`;

const LogoutText = styled.Text`
  font-size: 16px;
  color: blue;
`;

export default ProductList;
