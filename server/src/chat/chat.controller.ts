import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { FaissStore } from "langchain/vectorstores/faiss";
import { loadQAStuffChain } from "langchain/chains";
import fs from "fs";
import "faiss-node";
import { OpenAI } from "langchain";

const embeddings = new OpenAIEmbeddings();
const llm = new OpenAI();

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

// TODO:Use TextLoader from langchain to simplify de code
// TODO: Use db search to not pass path
const chatWithPdf = async (id: number, message: string, path: string) => {
  const chunks = getTextChunks(path);
  const chunksMetadata = getChunksMetadata(path);
  const knoeledgeBase = await FaissStore.fromTexts(
    chunks,
    chunksMetadata,
    embeddings
  );
  const docs = await knoeledgeBase.similaritySearch(message);
  const chainA = loadQAStuffChain(llm);
  const response = await chainA.call({
    input_documents: docs,
    question: message,
  });
  return response;
};

const ChatController = { chatWithPdf };

export default ChatController;
