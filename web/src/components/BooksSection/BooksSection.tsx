import { useEffect } from "react";
import DocumentServices from "../../services/document.services";
import FileCard from "../FileCard/FileCard";
import { Flex } from "@chakra-ui/react";
import useDocumentsStore from "../../stores/documents.store";

const BooksSection = () => {
  const { docs, getAndSetDocs } = useDocumentsStore();

  useEffect(() => {
    getAndSetDocs(DocumentServices.getAllDocuments);
  }, []);

  return (
    <>
      <Flex
        gap={10}
        paddingTop={10}
        justifyContent={["space-between", "start"]}
        flexWrap={"wrap"}
      >
        {docs.map((book) => (
          <FileCard key={book.name} {...book} />
        ))}
      </Flex>
    </>
  );
};

export default BooksSection;
