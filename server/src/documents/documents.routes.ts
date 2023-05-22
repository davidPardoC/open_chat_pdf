import { NextFunction, Request, Response, Router } from "express";
import { BadRequestExeption } from "../error/custom.error";
import { UploadedFile } from "express-fileupload";
import DocumentsController from "./documents.controller";

export const documentsRouter = Router();

documentsRouter.post(
  "",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const file = req.files?.file as UploadedFile;
      if (!file) {
        throw BadRequestExeption("Please upload a file!");
      }

      if (!file.mimetype.includes("pdf")) {
        throw BadRequestExeption("Only PDF files please!");
      }

      const response = await DocumentsController.uploadDocument(file);

      res.status(201).json(response);
    } catch (error) {
      next(error);
    }
  }
);

documentsRouter.get("", async (_, res: Response, next: NextFunction) => {
  try {
    const docs = await DocumentsController.getAllDocuments();
    res.json(docs);
  } catch (error) {
    next(error);
  }
});

documentsRouter.get(
  "/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const doc = await DocumentsController.getOneDocument(Number(id));
      res.json(doc);
    } catch (error) {
      next(error);
    }
  }
);
