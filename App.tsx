import "react-native-gesture-handler";
import React from "react";
import { Provider } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import store from "./src/store";
import HomeScreen from "./src/screens/HomeScreen";
import ProductScreen from "./src/screens/ProductScreen";
import CartScreen from "./src/screens/CartScreen";
import AuthScreen from "./src/screens/AuthScreen";
import PaymentScreen from "./src/screens/PaymentScreen";
import Login from "./src/components/auth/login";
import SignUp from "./src/components/auth/SignUp";
import AuthRequired from "./src/components/AuthRequired";
import Toast from "react-native-toast-message";

const Stack = createStackNavigator();

const App: React.FC = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Home">
            <Stack.Screen
              name="Auth"
              component={AuthScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Login"
              component={Login}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="SignUp"
              component={SignUp}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="ProductDetails"
              component={ProductScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen name="Cart">
              {() => (
                <AuthRequired>
                  <CartScreen />
                </AuthRequired>
              )}
            </Stack.Screen>
            <Stack.Screen name="Payment">
              {() => (
                <AuthRequired>
                  <PaymentScreen />
                </AuthRequired>
              )}
            </Stack.Screen>
          </Stack.Navigator>
        </NavigationContainer>
        <Toast />
      </Provider>
    </GestureHandlerRootView>
  );
};

export default App;
