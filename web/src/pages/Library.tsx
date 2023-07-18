import { Container } from "@chakra-ui/react";
import LibraryHeader from "../components/LibraryHeader/LibraryHeader";
import BooksSection from "../components/BooksSection/BooksSection";
import { useSearchParams } from "react-router-dom";

const Library = () => {
  const [params] = useSearchParams();
  const isEnabled = params.get("enabled");

  if (isEnabled !== "antse") {
    return <div></div>;
  }

  return (
    <Container
      maxW={"container.lg"}
      padding={10}
      backgroundColor={"transparent"}
    >
      <LibraryHeader />
      <BooksSection />
    </Container>
  );
};

export default Library;
