import express from "express";
import { documentsRouter } from "./documents/documents.routes";
import ErrorHandler from "./middlewares/error.middleware";

const app = express();
const PORT = process.env.PORT || 8080;

app.use("/documents", documentsRouter);

app.use(ErrorHandler);

export const startServer = () => {
  app.listen(8080, () => {
    console.log(`Server is running on port: ${PORT}`);
  });
};
