export type StackParamList = {
  Home: undefined;
  ProductDetails: { productId: number };
  Cart: undefined;
  Auth: undefined;
  Login: undefined;
  SignUp: undefined;
  Payment: undefined;
};

export interface Product {
  product_name: string;
  id: number;
  description: string;
  price: number;
  image: string;
  quantity_in_stock: number;
}

export type ValidRouteNames =
  | "SignUp"
  | "Home"
  | "ProductDetails"
  | "Cart"
  | "Auth"
  | "Login"
  | "Payment";

export type LoginData = {
  username: string;
  password: string;
};
