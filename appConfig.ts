import { getConfig } from "@expo/config";

const { exp } = getConfig(process.cwd());
export const appName = exp.name;

export default {
  expo: {
    extra: {
      ENCRYPTION_KEY: process.env.ENCRYPTION_KEY,
    },
  },
};