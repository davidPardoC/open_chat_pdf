import { NextFunction, Request, Response, Router } from "express";
import { BadRequestExeption } from "../error/custom.error";
import { UploadedFile } from "express-fileupload";
import DocumentsController from "../controllers/documents.controller";

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

      res.send("ok");
    } catch (error) {
      next(error);
    }
  }
);

documentsRouter.get("", () => {});
