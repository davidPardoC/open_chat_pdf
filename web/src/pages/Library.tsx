import { Container } from "@chakra-ui/react";
import LibraryHeader from "../components/LibraryHeader/LibraryHeader";
import BooksSection from "../components/BooksSection/BooksSection";

const Library = () => {
  return (
    <Container
      maxW={"container.lg"}
      padding={10}
      backgroundColor={"transparent"}
    >
      <LibraryHeader />
      <BooksSection/>
    </Container>
  );
};

export default Library;
