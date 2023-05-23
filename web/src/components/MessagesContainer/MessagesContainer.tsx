import { useEffect, useRef } from "react";
import useChatStore from "../../stores/messages.stores";
import MessageBox from "../MessageBox/MessageBox";
import { Box } from "@chakra-ui/react";
import { useParams } from "react-router-dom";

const MessagesContainer = () => {
  const { messages, isLoadingChat } = useChatStore();
  const { id } = useParams();
  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (divRef.current) {
      divRef.current.scrollTop = divRef.current?.scrollHeight;
    }
  }, [messages]);

  return (
    <Box
      maxHeight={"88vh"}
      overflowY={"scroll"}
      overflowX={"hidden"}
      paddingTop={5}
      css={{
        "&::-webkit-scrollbar": {
          width: "4px",
        },
        "&::-webkit-scrollbar-track": {
          width: "6px",
        },
        "&::-webkit-scrollbar-thumb": {
          background: "rgba(255,255,255, 0.2)",
          borderRadius: "24px",
        },
      }}
      ref={divRef}
    >
      {messages
        .filter((message) => message.bookId == id)
        .map((message, idx) => (
          <MessageBox {...message} key={idx} />
        ))}
      {isLoadingChat && <MessageBox isLoading sended={false} />}
    </Box>
  );
};

export default MessagesContainer;
