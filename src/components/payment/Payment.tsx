import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Button,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import styled from "styled-components/native";
import { useDispatch, useSelector } from "react-redux";
import {
  setAmount,
  setPaymentMethod,
  setBillingAddress,
  setCardInfo,
} from "../../store/paymentSlice";
import { paymentData } from "../../types/appTypes";
import { schema } from "./schema/paymentSchema";
import instanceAPI, { BASE_API_URL } from "../../Api/baseApi";
import { RootState } from "../../store";

const proceedPayment = async (data: paymentData) => {
  try {
    await instanceAPI.post(
      `${BASE_API_URL}a8645bc0?count=3&key=d8691d10`,
      data
    );
  } catch (error) {}
};

const PaymentScreen = () => {
  const [isLoading, setIsLoading] = useState<Boolean>(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const dispatch = useDispatch();

  const cart = useSelector((state: RootState) => state.cart);

  const onSubmit: SubmitHandler<paymentData> = (data) => {
    setIsLoading(true);
    dispatch(setAmount(cart?.total));
    dispatch(setPaymentMethod(data?.paymentMethod));
    dispatch(setBillingAddress(data?.billingAddress));
    dispatch(
      setCardInfo({
        cardName: data?.cardName,
        cardNumber: data?.cardNumber,
        cvv: data?.cvv,
      })
    );
    setIsLoading(false);
    proceedPayment({ ...data, amount: cart?.total });
  };

  const opacity = useSharedValue(0);

  useEffect(() => {
    opacity.value = withTiming(1, { duration: 1000 });
  }, [opacity]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    };
  });

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <Animated.View
        style={[
          animatedStyle,
          { flex: 1, padding: 20, justifyContent: "center" },
        ]}
      >
        <Header>Payment Details</Header>
        <Input
          value={`${String(cart?.total)} EGP`}
          placeholder="Amount"
          keyboardType="numeric"
          editable={false}
        />
        {errors.amount && <ErrorText>{errors.amount.message}</ErrorText>}

        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder="Payment Method"
            />
          )}
          name="paymentMethod"
          defaultValue=""
        />
        {errors.paymentMethod && (
          <ErrorText>{errors.paymentMethod.message}</ErrorText>
        )}

        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder="Billing Address"
            />
          )}
          name="billingAddress"
          defaultValue=""
        />
        {errors.billingAddress && (
          <ErrorText>{errors.billingAddress.message}</ErrorText>
        )}

        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder="Card Name"
            />
          )}
          name="cardName"
          defaultValue=""
        />
        {errors.cardName && <ErrorText>{errors.cardName.message}</ErrorText>}

        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder="Card Number"
              keyboardType="numeric"
            />
          )}
          name="cardNumber"
          defaultValue=""
        />
        {errors.cardNumber && (
          <ErrorText>{errors.cardNumber.message}</ErrorText>
        )}

        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder="CVV"
              keyboardType="numeric"
            />
          )}
          name="cvv"
          defaultValue=""
        />
        {errors.cvv && <ErrorText>{errors.cvv.message}</ErrorText>}

        <StyledButton onPress={handleSubmit(onSubmit)}>
          {isLoading ? (
            <ActivityIndicator color="white" />
          ) : (
            <ButtonText>Submit Payment</ButtonText>
          )}
        </StyledButton>
      </Animated.View>
    </KeyboardAvoidingView>
  );
};

const Header = styled.Text`
  font-size: 24px;
  margin-bottom: 20px;
  text-align: center;
  color: #333;
`;

const Input = styled.TextInput`
  height: 50px;
  border-color: #ccc;
  border-width: 1px;
  margin-bottom: 15px;
  padding-horizontal: 15px;
  border-radius: 8px;
  font-size: 16px;
  color: #333;
`;

const ErrorText = styled.Text`
  color: red;
  margin-bottom: 10px;
  font-size: 14px;
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

export default PaymentScreen;
