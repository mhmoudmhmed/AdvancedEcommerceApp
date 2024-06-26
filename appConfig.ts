import { getConfig } from "@expo/config";
import Constants from "expo-constants";

const { exp } = getConfig(process.cwd());
export const appName = exp.name;

export default () => {
  return {
    ENCRYPTION_KEY: Constants?.manifest?.extra?.ENCRYPTION_KEY,
  };
};
