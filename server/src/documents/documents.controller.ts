import { UploadedFile } from "express-fileupload";
import pdf from "pdf-parse";
import fs from "fs";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { Document } from "langchain/document";
import DocumentRepository from "./documents.repository";
import { NotFoundExeptions } from "../error/custom.error";
import { FaissStore } from "langchain/vectorstores/faiss";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { TextLoader } from "langchain/document_loaders/fs/text";

const embeddings = new OpenAIEmbeddings();

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

const saveDocumentToDB = async (
  name: string,
  path: string,
  textFileParsed: string,
  vectorsPath: string
) => {
  return await DocumentRepository.insertOne(
    name,
    path,
    textFileParsed,
    vectorsPath
  );
};

const documentExisteInDB = async (path: string) => {
  const doc = await DocumentRepository.getOneByPath(path);
  return !!doc;
};

const saveVectorStore = async (
  parsedTextFilePath: string,
  vectorDirectory: string
) => {
  const loader = new TextLoader(parsedTextFilePath);
  const docs = await loader.load();
  const vectorStore = await FaissStore.fromDocuments(docs, embeddings);
  await vectorStore.save(vectorDirectory)
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

  const vectorPath = `./vectors/${fileNameWithoutExtension}/`;

  const documentExists = await documentExisteInDB(savePath);

  let doc;
  if (!documentExists) {
    doc = await saveDocumentToDB(
      file.name,
      savePath,
      parsedFilePath,
      vectorPath
    );
  }

  if (doc) {
    await saveVectorStore(doc.text_parsed_path, doc.vector_directory);
  }

  return { message: "File uploaded succesfully!", doc };
};

const getAllDocuments = async () => {
  const docs = await DocumentRepository.getAll();
  return docs;
};

const getOneDocument = async (id: number) => {
  const doc = await DocumentRepository.getOneById(id);
  if (!doc) {
    throw NotFoundExeptions();
  }
  return doc;
};

const DocumentsController = { uploadDocument, getAllDocuments, getOneDocument };

export default DocumentsController;
