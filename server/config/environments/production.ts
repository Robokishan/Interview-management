import configType from "./configType";
let config: configType = {
  PORT: process.env.PORT || 80,
  SECRET: process.env.JWT_SECRET || "DEV_SECRET",
  JWT_EXPIRATION: process.env.JWT_EXPIRATION || 86400,
  SALT_ROUNDS: 10,
};

export default config;
