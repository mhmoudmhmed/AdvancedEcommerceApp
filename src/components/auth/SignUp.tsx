import React, { useState } from "react";
import { ActivityIndicator, Alert, Text } from "react-native";
import axios from "axios";
import { StackNavigationProp } from "@react-navigation/stack";
import styled from "styled-components/native";
import { StackParamList, signUpData } from "../../types/appTypes";
import { BASE_API_URL } from "../../Api/baseApi";
import { useDispatch } from "react-redux";
import { signup } from "../../store/authSlice";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { schema } from "./schema/signupSchema";

type SignUpScreenNavigationProp = StackNavigationProp<StackParamList, "Auth">;

interface SignUpProps {
  navigation: SignUpScreenNavigationProp;
}

const SignUp: React.FC<SignUpProps> = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState<Boolean>(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const dispatch = useDispatch();

  const onSubmit = async (data: signUpData) => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        `${BASE_API_URL}/0b6c6300?count=1&key=d8691d10`,
        data
      );
      dispatch(signup(response.data?.[0].token));
      navigation.navigate("Home");
    } catch (error) {
      Alert.alert("Error", "Failed to sign up. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

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

  return (
    <Container>
      <Animated.View style={animatedStyle}>
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

        <Label>Email</Label>
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input onBlur={onBlur} onChangeText={onChange} value={value} />
          )}
          name="email"
          defaultValue=""
        />
        {errors.email && <ErrorText>{errors.email.message}</ErrorText>}

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

        <Label>Confirm Password</Label>
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
          name="confirm_password"
          defaultValue=""
        />
        {errors.confirm_password && (
          <ErrorText>{errors.confirm_password.message}</ErrorText>
        )}

        <Label>Phone Number</Label>
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              keyboardType="numeric"
            />
          )}
          name="phone_number"
          defaultValue=""
        />
        {errors.phone_number && (
          <ErrorText>{errors.phone_number.message}</ErrorText>
        )}

        <StyledButton
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          onPress={handleSubmit(onSubmit)}
        >
          {isLoading ? (
            <ActivityIndicator color="white" />
          ) : (
            <ButtonText>Sign Up</ButtonText>
          )}
        </StyledButton>

        <AlreadyHaveAccountText onPress={() => navigation.navigate("Login")}>
          Already have an account?
          <Text> Sign In</Text>
        </AlreadyHaveAccountText>
      </Animated.View>
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
  margin-bottom: 10px;
  border-color: #ccc;
  border-width: 1px;
  border-radius: 5px;
`;

const ErrorText = styled.Text`
  color: red;
  margin-bottom: 10px;
`;

const AlreadyHaveAccountText = styled.Text`
  margin-top: 20px;
  text-align: center;
  color: blue;
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

export default SignUp;
