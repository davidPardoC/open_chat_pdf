import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { FaissStore } from "langchain/vectorstores/faiss";
import { loadQAStuffChain } from "langchain/chains";
import "faiss-node";
import { OpenAI } from "langchain/llms/openai";
import DocumentRepository from "../documents/documents.repository";
import { NotFoundExeptions } from "../error/custom.error";

const embeddings = new OpenAIEmbeddings();
const llm = new OpenAI();

const chatWithPdf = async (id: number, message: string) => {
  const doc = await DocumentRepository.getOneById(id);
  if (!doc) {
    throw NotFoundExeptions();
  }

  const vectorStore = await FaissStore.load(doc.vector_directory, embeddings);
  const similarity = await vectorStore.similaritySearch(message);
  const chainA = loadQAStuffChain(llm);
  const response = await chainA.call({
    input_documents: similarity,
    question: message,
  });
  return { ...response };
};

const ChatController = { chatWithPdf };

export default ChatController;
