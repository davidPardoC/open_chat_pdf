import { UploadedFile } from "express-fileupload";
import pdf from "pdf-parse";
import fs from "fs";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { Document } from "langchain/document";
import DocumentRepository from "./documents.repository";

const { insertOne, getAll, getOneByPath } = DocumentRepository;

const parsePdfDataAndSave = async (dataBuffer: Buffer, path: string) => {
  const pdfReader = await pdf(dataBuffer);
  fs.openSync(path, "w");
  fs.writeFileSync(path, pdfReader.text);
};

const splitParsedPDFintoChunks = async (
  pdfPath: string,
  toSaveChunksPath: string
) => {
  const parsedFile = fs.readFileSync(pdfPath).toString();
  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 1000,
    chunkOverlap: 200,
  });

  const chunks = await splitter.splitDocuments([
    new Document({ pageContent: parsedFile }),
  ]);

  fs.openSync(toSaveChunksPath, "w");
  fs.writeFileSync(toSaveChunksPath, JSON.stringify(chunks));
};

// TODO:save all paths .json .txt
const saveDocumentToDB = async (name: string, path: string) => {
  await insertOne(name, path);
};

const documentExisteInDB = async (path: string) => {
  const doc = await getOneByPath(path);
  return !!doc;
};

const uploadDocument = async (file: UploadedFile) => {
  let fileNameWithoutExtension = file.name.split(".")[0];
  fileNameWithoutExtension = fileNameWithoutExtension.replace(/ /g, "_");

  const basePath = "./uploads/" + fileNameWithoutExtension;
  const savePath = basePath + "/" + file.name;

  await file.mv(savePath);

  const parsedFilePath =
    basePath + "/" + fileNameWithoutExtension + "-parsed.txt";

  const dataBuffer = fs.readFileSync(savePath);
  await parsePdfDataAndSave(dataBuffer, parsedFilePath);

  const toSaveChunksPath =
    basePath + "/" + fileNameWithoutExtension + "-chunked.json";
  await splitParsedPDFintoChunks(parsedFilePath, toSaveChunksPath);

  
  const documentExists = await documentExisteInDB(savePath);
  if (!documentExists) {
    await saveDocumentToDB(file.name, savePath);
  }

  return { message: "File uploaded succesfully!" };
};

const getAllDocuments = async () => {
  const docs = await getAll();
  return docs;
};

const DocumentsController = { uploadDocument, getAllDocuments };

export default DocumentsController;
