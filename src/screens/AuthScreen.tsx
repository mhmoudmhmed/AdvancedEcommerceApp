import { NavigationProp, useNavigation } from "@react-navigation/native";
import React from "react";
import styled from "styled-components/native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

type RootStackParamList = {
  Login: undefined;
  SignUp: undefined;
};

type AuthScreenNavigationProp = NavigationProp<RootStackParamList>;

const AuthScreen: React.FC = () => {
  const navigation = useNavigation<AuthScreenNavigationProp>();

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
      <Title>Welcome</Title>
      <ButtonContainer>
        <Animated.View style={animatedStyle}>
          <StyledButton
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            onPress={() => navigation.navigate("Login")}
          >
            <ButtonText>Login</ButtonText>
          </StyledButton>
        </Animated.View>
        <Animated.View style={animatedStyle}>
          <StyledButton
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            onPress={() => navigation.navigate("SignUp")}
          >
            <ButtonText>Sign Up</ButtonText>
          </StyledButton>
        </Animated.View>
      </ButtonContainer>
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #f0f0f0;
`;

const Title = styled.Text`
  font-size: 32px;
  font-weight: bold;
  margin-bottom: 20px;
  color: #333;
`;

const ButtonContainer = styled.View`
  width: 80%;
`;

const StyledButton = styled.TouchableOpacity`
  background-color: #007aff;
  padding: 15px;
  border-radius: 10px;
  margin-bottom: 15px;
  align-items: center;
`;

const ButtonText = styled.Text`
  color: #fff;
  font-size: 18px;
  font-weight: bold;
`;

export default AuthScreen;
