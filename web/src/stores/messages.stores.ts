import { create } from "zustand";

const useChatStore = create<{messages:any[]}>((set) => ({
  messages: ["1", "2", "3", , 5, 6, 7, 8],
}));

export default useChatStore;
