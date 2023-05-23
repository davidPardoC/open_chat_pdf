import axios from "axios";

axios.defaults.baseURL = "http://localhost:8000";

const postChat = async (documentId: number, message: string) => {
  const { data } = await axios.post<{ text: string }>("/chat/", {
    documentId,
    message,
  });
  return data;
};

const ChatService = { postChat };

export default ChatService;
