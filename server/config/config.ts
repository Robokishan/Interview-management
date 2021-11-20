import configType from "./environments/configType";
import developmentConfig from "./environments/development";
import productionConfig from "./environments/production";

let config: configType;

if (process.env.NODE_ENV == "development") {
  config = developmentConfig;
} else {
  config = productionConfig;
}

export default config;


