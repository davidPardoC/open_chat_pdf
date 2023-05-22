import axios from "axios";

axios.defaults.baseURL = "http://localhost:8000";

const getAllDocuments = async () => {
  const { data } = await axios.get("/documents/");
  return data;
};

const uploadFile = async (formData: FormData) => {
  const data = await axios.post("/documents/", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data;
};

const DocumentServices = { getAllDocuments, uploadFile };

export default DocumentServices;
