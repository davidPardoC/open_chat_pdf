import { create } from "zustand";

export type Message = {
  text?: string;
  isLoading?: boolean;
  sended: boolean;
  bookId?: number
};

interface MessageStoreInteface {
  messages: Message[];
  isLoadingChat: boolean;
  appendNewMessage: (message: Message) => void;
  setChatLoading: (value: boolean) => void;
}

const useChatStore = create<MessageStoreInteface>((set, get) => ({
  messages: [],
  isLoadingChat: false,
  appendNewMessage: (message: Message) =>
    set((state) => {
      const messages = [...get().messages, message];
      return { ...state, messages };
    }),
  setChatLoading: (value: boolean) =>
    set((state) => {
      return { ...state, isLoadingChat: value };
    }),
}));

export default useChatStore;
