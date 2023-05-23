import useChatStore from "../../stores/messages.stores";
import MessageBox from "../MessageBox/MessageBox";
import { Box } from "@chakra-ui/react";

const MessagesContainer = () => {
  const { messages } = useChatStore();

  return (
    <Box
      maxHeight={"88vh"}
      overflowY={"scroll"}
      overflowX={"hidden"}
      css={{
        "&::-webkit-scrollbar": {
          width: "4px",
        },
        "&::-webkit-scrollbar-track": {
          width: "6px",
        },
        "&::-webkit-scrollbar-thumb": {
          background: "rgba(255,255,255, 0.5)",
          borderRadius: "24px",
        },
      }}
    >
      {messages.map((_, idx) => (
        <MessageBox sended={idx % 2 == 0} />
      ))}
    </Box>
  );
};

export default MessagesContainer;
