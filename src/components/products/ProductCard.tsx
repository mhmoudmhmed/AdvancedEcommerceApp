import React from "react";
import styled from "styled-components/native";

interface ProductCardProps {
  product: {
    id: number;
    name: string;
    price: number;
    image: string;
    description: string;
  };
  onPress: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onPress }) => {
  return (
    <Card onPress={onPress}>
      <ProductImage source={{ uri: product.image }} />
      <Name>{product.name}</Name>
      <Price>${product.price}</Price>
      <Description>{product.description}</Description>
    </Card>
  );
};

const Card = styled.TouchableOpacity`
  padding: 10px;
  margin: 10px;
  border-color: #ccc;
  border-width: 1px;
  border-radius: 5px;
  background-color: #fff;
`;

const ProductImage = styled.Image`
  width: 100%;
  height: 200px;
`;

const Name = styled.Text`
  font-size: 20px;
  font-weight: bold;
`;

const Price = styled.Text`
  font-size: 18px;
  color: green;
`;

const Description = styled.Text`
  font-size: 14px;
  color: #666;
`;

export default ProductCard;
