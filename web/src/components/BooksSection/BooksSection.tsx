import { useEffect, useState } from "react";
import DocumentServices from "../../services/document.services";
import FileCard from "../FileCard/FileCard";
import { Flex } from "@chakra-ui/react";

type Book = {
  name: string;
  id: number;
  path?: string;
};

const BooksSection = () => {
  const [books, setBooks] = useState<Book[]>([]);

  const getAllDocuments = async () => {
    const documents = await DocumentServices.getAllDocuments();
    setBooks(documents);
  };

  useEffect(() => {
    getAllDocuments();
  }, []);

  return (
    <>
      <Flex
        gap={10}
        paddingTop={10}
        justifyContent={["space-between", "start"]}
        flexWrap={"wrap"}
      >
        {books.map((book) => (
          <FileCard key={book.name} {...book} />
        ))}
      </Flex>
    </>
  );
};

export default BooksSection;
