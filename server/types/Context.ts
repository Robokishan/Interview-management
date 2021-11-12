import { Request, Response } from "express";

export interface Context {
  req: Request | any;
  res: Response;
}
