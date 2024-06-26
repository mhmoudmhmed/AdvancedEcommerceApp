import Constants from "expo-constants";

const getEnvVars = () => {
  if (!Constants.manifest) {
    // Constants.manifest is undefined in bare workflow
    return {
      ENCRYPTION_KEY: process.env.ENCRYPTION_KEY,
    };
  }
  return {
    ENCRYPTION_KEY: Constants.manifest.extra?.ENCRYPTION_KEY,
  };
};

export default getEnvVars;
