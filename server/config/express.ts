import express from "express";
import cookieParser from "cookie-parser";
import { Request, Response } from "express";

var initApp = function () {
  var app = express();
  app.use(express.json());
  app.use(
    express.urlencoded({
      extended: true,
    })
  );
  app.use(cookieParser());
  // Define a health check endpoint
  app.get("/healthz", (_req: Request, res: Response) => {
    res.status(200).send("OK 1.5");
  });
  console.log("version:", process.env.NODE_ENV);
  return app;
};
export default initApp;
