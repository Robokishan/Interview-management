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

// const config = import(`./environments/${process.env.NODE_ENV}`);
// console.log(await config);
// import * from "./environments/development";
// let config;
// if (process.env.NODE_ENV == "development") {
// }
// // export default config;
// (async function () {
//   const run = await import(`./environments/${process.env.NODE_ENV}`);
//   export default config;
// })();
