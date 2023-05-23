import { NextFunction, Request, Response, Router } from "express";
import { checkSchema, validationResult } from "express-validator";
import ChatController from "./chat.controller";

const messageValidator = checkSchema({
  documentId: { isInt: true },
  message: { isString: true },
});

export const chatRouter = Router();

chatRouter.post(
  "",
  messageValidator,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = validationResult(req);
      if (!result.isEmpty()) {
        res.status(400).send({ errors: result.array() });
      }
      const { documentId, message } = req.body;
      const resposnse = await ChatController.chatWithPdf(documentId, message);
      res.json(resposnse);
    } catch (error) {
      next(error);
    }
  }
);

chatRouter.post("/mock-chat", (req: Request, res: Response) => {
  setTimeout(() => {
    res.json({ text: req.body.message });
  }, 2000);
});
