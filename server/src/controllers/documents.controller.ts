import { UploadedFile } from "express-fileupload";
import pdf from "pdf-parse";
import fs from "fs";

const uploadDocument = async (file: UploadedFile) => {
  let fileNameWithoutExtension = file.name.split(".")[0];
  fileNameWithoutExtension = fileNameWithoutExtension.replace(/ /g, "_");

  const basePath = "./uploads/" + fileNameWithoutExtension;
  const savePath = basePath + "/" + file.name;

  await file.mv(savePath);

  // Reads PDF and save parsed text in .txt file
  const dataBuffer = fs.readFileSync(savePath);
  const pdfReader = await pdf(dataBuffer);
  const parsedFilePath =
    basePath + "/" + fileNameWithoutExtension + "-parsed.txt";
  fs.openSync(parsedFilePath, "w");
  fs.writeFileSync(parsedFilePath, pdfReader.text);

};

const DocumentsController = { uploadDocument };

export default DocumentsController;
