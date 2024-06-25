import { getConfig } from "@expo/config";

const { exp } = getConfig(process.cwd());
export const appName = exp.name;
