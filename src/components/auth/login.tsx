import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../store/authSlice";
import axios from "axios";
import { StackNavigationProp } from "@react-navigation/stack";
import styled from "styled-components/native";
import {
  LoginData,
  StackParamList,
  ValidRouteNames,
} from "../../types/appTypes";
import { BASE_API_URL } from "../../Api/baseApi";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from "react-native-reanimated";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "./schema/loginSchema";
import { ActivityIndicator } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

type LoginScreenNavigationProp = StackNavigationProp<
  StackParamList,
  "SignUp" | "Home" | "ProductDetails" | "Cart" | "Auth" | "Login" | "Payment"
>;

const Login: React.FC = () => {
  const [isLoading, setIsLoading] = useState<Boolean>(false);
  const route = useRoute();
  const { redirectTo } = (route.params as { redirectTo?: string }) || {};

  const navigation = useNavigation<LoginScreenNavigationProp>();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const dispatch = useDispatch();

  const scale = useSharedValue(1);
  const opacity = useSharedValue(1);

  const handlePressIn = () => {
    scale.value = withTiming(0.95, {
      duration: 100,
      easing: Easing.inOut(Easing.ease),
    });
    opacity.value = withTiming(0.6, {
      duration: 100,
      easing: Easing.inOut(Easing.ease),
    });
  };

  const handlePressOut = () => {
    scale.value = withTiming(1, {
      duration: 100,
      easing: Easing.inOut(Easing.ease),
    });
    opacity.value = withTiming(1, {
      duration: 100,
      easing: Easing.inOut(Easing.ease),
    });
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
      opacity: opacity.value,
    };
  });

  const onSubmit = async (data: LoginData) => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        `${BASE_API_URL}/27e5d1d0?count=1&key=d8691d10`,
        data
      );
      dispatch(login(response.data?.[0].token));
      const validRedirectTo = redirectTo as ValidRouteNames | undefined;
      if (validRedirectTo) {
        navigation.navigate(validRedirectTo as any);
      } else {
        navigation.navigate("Home");
      }
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container>
      <Label>Username</Label>
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <Input onBlur={onBlur} onChangeText={onChange} value={value} />
        )}
        name="username"
        defaultValue=""
      />
      {errors.username && <ErrorText>{errors.username.message}</ErrorText>}

      <Label>Password</Label>
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            secureTextEntry
          />
        )}
        name="password"
        defaultValue=""
      />
      {errors.password && <ErrorText>{errors.password.message}</ErrorText>}

      <Animated.View style={animatedStyle}>
        <StyledButton
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          onPress={handleSubmit(onSubmit)}
        >
          {isLoading ? (
            <ActivityIndicator color="white" />
          ) : (
            <ButtonText>Login</ButtonText>
          )}
        </StyledButton>
      </Animated.View>
      <SignUpPrompt onPress={() => navigation.navigate("SignUp")}>
        <SignUpText>Don't have an account? Sign Up</SignUpText>
      </SignUpPrompt>
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  padding: 20px;
  justify-content: center;
`;

const Label = styled.Text`
  font-size: 18px;
  margin-bottom: 5px;
`;

const Input = styled.TextInput`
  font-size: 18px;
  padding: 10px;
  margin-bottom: 20px;
  border-color: #ccc;
  border-width: 1px;
  border-radius: 5px;
`;

const ErrorText = styled.Text`
  color: red;
  margin-bottom: 10px;
`;

const StyledButton = styled.TouchableOpacity`
  background-color: #007aff;
  padding: 15px;
  border-radius: 5px;
  align-items: center;
`;

const ButtonText = styled.Text`
  color: white;
  font-size: 18px;
`;

const SignUpPrompt = styled.TouchableOpacity`
  margin-top: 20px;
`;

const SignUpText = styled.Text`
  font-size: 16px;
  color: blue;
  text-align: center;
`;

export default Login;
