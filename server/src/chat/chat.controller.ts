import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { FaissStore } from "langchain/vectorstores/faiss";
import { TextLoader } from "langchain/document_loaders/fs/text";
import fs from "fs";

const embeddings = new OpenAIEmbeddings();

const getTextChunks = (filePath: string) => {
  const chunkfilePath =
    filePath.slice(0, -4).replace(/ /g, "_") + "-chunked.json";
  const file = fs.readFileSync(chunkfilePath).toString();
  return (JSON.parse(file) as { pageContent: string }[]).map(
    ({ pageContent }) => pageContent
  );
};

const getChunksMetadata = (filePath: string) => {
  const chunkfilePath =
    filePath.slice(0, -4).replace(/ /g, "_") + "-chunked.json";
  const file = fs.readFileSync(chunkfilePath).toString();
  return (
    JSON.parse(file) as {
      pageContent: string;
      metadata: { [key: string]: any };
    }[]
  ).map(({ metadata }) => ({ ...metadata }));
};

const chatWithPdf = async (id: number, message: string, path: string) => {
  const loader = new TextLoader("./uploads/Caso_2/Caso_2-parsed.txt");
  const docs = await loader.load();
  const vectorStore = await FaissStore.fromDocuments(docs, embeddings);
  vectorStore.similaritySearch(message);
  return docs;
  /* const chunks = getTextChunks(path);
  const chunksMetadata = getChunksMetadata(path)
  const knoeledgeBase = await FaissStore.fromTexts(chunks, chunksMetadata, embeddings);
  console.log("Humm")
  const docs = await knoeledgeBase.similaritySearch(message);
  return docs; */
};

const ChatController = { chatWithPdf };

export default ChatController;
