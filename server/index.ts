process.env.NODE_ENV = process.env.NODE_ENV || "development";

import dotenv = require('dotenv');
import config from './config/config';
import express from "./config/express"

// new methods
import "reflect-metadata";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { createConnection, Connection } from "typeorm";
import "dotenv-safe/config";

import path from "path";
import { FormResolver } from "./controllers/typeGraphqlResolvers/FormResolver";
import { Forms } from "./models/typeormEnt/v1/Forms";
import { formanswers } from "./models/typeormEnt/v1/FormAns";
import { Users } from "./models/typeormEnt/v1/User";
import { UserResolver } from "./controllers/typeGraphqlResolvers/UserResolver";
import { FormAnsResolver } from "./controllers/typeGraphqlResolvers/FormAnsResolver";
import { Context } from "./types/Context";
import cors, { CorsOptions } from "cors";
import { customAuthChecker } from "./utils/ts/AuthCheker";

async function main() {
  // Create server
  var app = express();
  let originList = [
    "http://localhost:5050",
    "http://localhost:3000",
  ];

  // Construct a schema, using GraphQL schema language

  const connection: Connection = await createConnection({
    type: "mongodb",
    logging: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    url: process.env.MONGODB_URL,
    migrations: [path.join(__dirname, "./migrations/*")],
    entities: [Forms, formanswers, Users],
  });

  //   await connection.connect();

  const schema = await buildSchema({
    resolvers: [FormResolver, UserResolver, FormAnsResolver], // add this,
    authChecker: customAuthChecker,
    authMode: "null",
  });
  const server = new ApolloServer({
    schema,
    playground: true,
    context: ({ req, res }) => {
      const ctx: Context = {
        req,
        res,
      };
      return ctx;
    },
  });
  // enable cors
  var corsOptions: CorsOptions = {
    origin: originList,
    credentials: true, // <-- REQUIRED backend setting
  };
  // app.use(cors(corsOptions));
  server.applyMiddleware({
    app,
    cors: corsOptions,
  });

  // Start listening
  app.listen(config.PORT, function () {
    if (process.env.NODE_ENV != "proudction") {
      var table = new Table({ head: ["", "APi", "Method"] });
      var routeList = listEndpoints(app);
      routeList.forEach((link: any, index: any) => {
        let method_message = "";
        for (let i = 0; i < link.methods.length; i++) {
          method_message += link.methods[i];
          if (link.methods.length > 1 && i < link.methods.length - 1) {
            method_message += ", ";
          }
        }
        table.push([index, link.path, colors.red(method_message)]);
      });
      console.log(table.toString());
      console.log("********************************************\n");
    }
    console.log(
      colors.green(
        "🚀  Listening with " +
          process.env.NODE_ENV +
          " config on port " +
          config.PORT
      )
    );
  });
}
main();
