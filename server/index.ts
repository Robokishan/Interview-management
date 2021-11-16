process.env.NODE_ENV = process.env.NODE_ENV || "development";

import dotenv = require("dotenv");
import { MikroORM } from "@mikro-orm/core";
import { MongoDriver } from "@mikro-orm/mongodb";
import { ApolloServer } from "apollo-server-express";
import colors from "colors";
import cors, { CorsOptions } from "cors";
import "dotenv-safe/config";
// new methods
import "reflect-metadata";
import { buildSchema } from "type-graphql";
import config from "./config/config";
import express from "./config/express";
import { InterviewResolver } from "./controllers/resolvers/InterviewResolver";
import { LogsResolver } from "./controllers/resolvers/LogsResolver";
import { UserResolver } from "./controllers/resolvers/UserResolver";
import { Interview } from "./entities/Interview";
import { Logs } from "./entities/Logs";
import { User } from "./entities/User";
import { Context } from "./types/Context";
import { customAuthChecker } from "./utils/AuthCheker";
import { __prod__ } from "./utils/constant";

async function main() {
  // Create server
  var app = express();
  let originList = ["http://localhost:5050", "http://localhost:3000"];

  if (process.env.NODE_ENV == "development")
    originList.push("https://studio.apollographql.com");

  // Construct a schema, using GraphQL schema language

  // make sure to provide the MongoDriver type hint
  const orm = await MikroORM.init<MongoDriver>({
    entities: [Interview, Logs, User],
    clientUrl: process.env.MONGODB_URL,
    type: "mongo",
    debug: !__prod__,
    implicitTransactions: true, // defaults to false
  });

  await orm.em.getDriver().createCollections();

  //   await connection.connect();

  const schema = await buildSchema({
    resolvers: [InterviewResolver, LogsResolver, UserResolver], // add this,
    authChecker: customAuthChecker,
    authMode: "null",
  });
  const server = new ApolloServer({
    schema,
    playground: true,
    context: ({ req, res }) => {
      const ctx: Context = {
        em: orm.em,
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
  // app.set("trust proxy", process.env.NODE_ENV !== "production");
  app.use(cors(corsOptions));
  server.applyMiddleware({
    app,
    cors: false,
  });

  // Start listening
  app.listen(config.PORT, function () {
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
