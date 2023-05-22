import { Heading } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DocumentServices from "../services/document.services";

const ChatBook = () => {
  const { id } = useParams();
  const [book, setBook] = useState<{ name: string }>();

  const getDocuementInfo = async () => {
    const doc = await DocumentServices.getDocumentInfo(id as string);
    setBook(doc);
  };

  useEffect(() => {
    getDocuementInfo();
  }, []);

  if (!book){
    return "Loadinf..."
  }

  return <Heading color={"white"}>{book.name}</Heading>;
};

export default ChatBook;
