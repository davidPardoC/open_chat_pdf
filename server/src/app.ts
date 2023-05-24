import express, { json } from "express";
import { documentsRouter } from "./documents/documents.routes";
import ErrorHandler from "./middlewares/error.middleware";
import fileUpload from "express-fileupload";
import cors from "cors";
import { chatRouter } from "./chat/chat.routes";
import "dotenv/config";
import path from "path";

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(json());
app.use(fileUpload({ createParentPath: true }));
app.use(express.static(path.join(__dirname, "static")));

app.use("/documents", documentsRouter);
app.use("/chat", chatRouter);

// Catch all to not 404 on reload client side routing
app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "static", "index.html"));
});

app.use(ErrorHandler);

export const startServer = () => {
  app.listen(PORT, () => {
    console.log(`Server is running on: http://localhost:${PORT}`);
  });
};
