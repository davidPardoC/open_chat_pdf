import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { FaissStore } from "langchain/vectorstores/faiss";
import { loadQAStuffChain } from "langchain/chains";
import { OpenAI } from "langchain/llms/openai";
import DocumentRepository from "../documents/documents.repository";
import { NotFoundExeptions } from "../error/custom.error";
import fs from "fs";
import "faiss-node";

const embeddings = new OpenAIEmbeddings();
const llm = new OpenAI();

const getTextChunks = (filePath: string) => {
  const file = fs.readFileSync(filePath).toString();
  return (JSON.parse(file) as { pageContent: string }[]).map(
    ({ pageContent }) => pageContent
  );
};

const getChunksMetadata = (filePath: string) => {
  const file = fs.readFileSync(filePath).toString();
  return (
    JSON.parse(file) as {
      pageContent: string;
      metadata: { [key: string]: any };
    }[]
  ).map(({ metadata }) => ({ ...metadata }));
};

const chatWithPdf = async (id: number, message: string) => {
  const doc = await DocumentRepository.getOneById(id);
  if (!doc) {
    throw NotFoundExeptions();
  }

  const chunks = getTextChunks(doc.chunks_path);
  const chunksMetadata = getChunksMetadata(doc.chunks_path);
  // TODO: maybe use RedisVectorStore to improve performance
  const knoeledgeBase = await FaissStore.fromTexts(
    chunks,
    chunksMetadata,
    embeddings
  );
  const input_documents = await knoeledgeBase.similaritySearch(message);
  const chainA = loadQAStuffChain(llm);
  const response = await chainA.call({
    input_documents,
    question: message
  })
  return response;
};

const ChatController = { chatWithPdf };

export default ChatController;
