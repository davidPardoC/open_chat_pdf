import { NextFunction, Request, Response, Router } from "express";
import { BadRequestExeption, CustomError } from "../error/custom.error";

export const documentsRouter = Router();

documentsRouter.post("", (req: Request, res: Response, next: NextFunction) => {
  throw BadRequestExeption();
});
