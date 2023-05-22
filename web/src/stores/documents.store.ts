import { create } from "zustand";
import { Doc } from "../types/document.types";

interface StoreInterface {
  docs: Doc[];
  setAllDocs: any;
  getAndSetDocs: any;
}

const setAllDocs = (
  state: StoreInterface | Partial<StoreInterface>,
  docs: Doc[]
): StoreInterface | Partial<StoreInterface> => {
  return { ...state, docs };
};

const getDocs = async (service: () => Promise<Doc[]>) => {
  const docs = await service();
  return docs;
};

const useDocumentsStore = create<StoreInterface>((set, get) => ({
  docs: [],
  setAllDocs: (docs: Doc[]) => set((state) => setAllDocs(state, docs)),
  getAndSetDocs: async (service: () => Promise<Doc[]>) => {
    const docs = await getDocs(service);
    set((state) => ({ ...state, docs }));
  },
}));

export default useDocumentsStore;
