import Constants, { ExecutionEnvironment } from "expo-constants";

const getEnvVars = () => {
  if (Constants.executionEnvironment === ExecutionEnvironment.StoreClient) {
    return {
      ENCRYPTION_KEY: Constants.expoConfig?.extra?.ENCRYPTION_KEY,
    };
  } else {
    return {
      ENCRYPTION_KEY: null,
    };
  }
};

export default getEnvVars;
