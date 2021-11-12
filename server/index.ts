process.env.NODE_ENV = process.env.NODE_ENV || "development";

import dotenv = require("dotenv");
import config from "./config/config";
import express from "./config/express";

// new methods
import "reflect-metadata";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { Connection, IDatabaseDriver, MikroORM } from '@mikro-orm/core';
import { MongoDriver } from '@mikro-orm/mongodb';
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
import colors from "colors";
import { customAuthChecker } from "./utils/ts/AuthCheker";

async function main() {
  // Create server
  var app = express();
  let originList = [
    "http://localhost:5050",
    "http://localhost:3000",
    "https://formbuilder-frontend.netlify.app",
  ];

  // Construct a schema, using GraphQL schema language

// make sure to provide the MongoDriver type hint
const orm = await MikroORM.init<MongoDriver>({
  entities: [Author, Book, ...],
  clientUrl: 'mongodb://localhost:27017,localhost:27018,localhost:27019/my-db-name?replicaSet=rs0',
  type: 'mongo',
  implicitTransactions: true, // defaults to false
});

await orm.em.getDriver().createCollections();

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
  app.use(cors(corsOptions));
  server.applyMiddleware({
    app,
    cors:false
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
