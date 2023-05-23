import { Container, Heading, Skeleton, Stack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DocumentServices from "../services/document.services";
import ChatInput from "../components/ChatInput/ChatInput";
import MessagesContainer from "../components/MessagesContainer/MessagesContainer";

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

  if (!book) {
    return (
      <Container paddingTop={5}>
        <Stack>
          <Skeleton height={"10px"} />
          <Skeleton height={"10px"} />
          <Skeleton height={"10px"} />
        </Stack>
      </Container>
    );
  }

  return (
    <Container paddingTop={5} minHeight={"100vh"} position={"relative"} maxW={"container.md"}>
      <Heading size={"lg"} textAlign={"center"} color={"white"}>
        {book.name}
      </Heading>
      <MessagesContainer />
      <ChatInput />
    </Container>
  );
};

export default ChatBook;
