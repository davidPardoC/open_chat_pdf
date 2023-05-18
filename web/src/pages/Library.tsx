import { AddIcon } from "@chakra-ui/icons";
import { Button, Container, Flex } from "@chakra-ui/react";
import LibraryHeader from "../components/LibraryHeader/LibraryHeader";

const Library = () => {
  return (
    <Container
      maxW={"container.lg"}
      padding={10}
      backgroundColor={"transparent"}
    >
      <LibraryHeader />
    </Container>
  );
};

export default Library;
