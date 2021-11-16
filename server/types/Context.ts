import { EntityManager, IDatabaseDriver, Connection } from "@mikro-orm/core";
import { MongoDriver } from "@mikro-orm/mongodb";
import { MongoEntityManager } from "@mikro-orm/mongodb/MongoEntityManager";
import { Request, Response } from "express";

export interface Context {
  em: MongoEntityManager<MongoDriver> &
    EntityManager<IDatabaseDriver<Connection>>;
  req: Request | any;
  res: Response;
}
