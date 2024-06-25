import React from "react";
import { useFocusEffect } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { useNavigation, CommonActions } from "@react-navigation/native";
import { RootState } from "../store";
import { StackNavigationProp } from "@react-navigation/stack";
import { StackParamList, ValidRouteNames } from "../types/appTypes";

type LoginScreenNavigationProp = StackNavigationProp<StackParamList, "Login">;

interface AuthRequiredProps {
  children: React.ReactNode;
}

const AuthRequired: React.FC<AuthRequiredProps> = ({ children }) => {
  const navigation = useNavigation<LoginScreenNavigationProp>();
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  useFocusEffect(
    React.useCallback(() => {
      if (!isAuthenticated) {
        navigation.dispatch(
          CommonActions.navigate({
            name: "Login",
            params: {
              redirectTo: navigation.getState().routes[
                navigation.getState().index
              ].name as ValidRouteNames,
            },
          })
        );
      }
    }, [isAuthenticated, navigation])
  );

  return <>{children}</>;
};

export default AuthRequired;
