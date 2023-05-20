import { NextFunction, Request, Response, Router } from "express";
import { CustomError } from "../error/custom.error";

export const documentsRouter = Router();

documentsRouter.post("", (req: Request, res: Response, next: NextFunction) => {
  throw new CustomError("Un error mi perro", 400);
});
