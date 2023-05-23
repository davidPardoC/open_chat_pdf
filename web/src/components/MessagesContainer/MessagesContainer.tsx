import React from "react";
import MessageBox from "../MessageBox/MessageBox";
import { Box } from "@chakra-ui/react";

const MessagesContainer = () => {
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
      <MessageBox sended />
      <MessageBox />
      <MessageBox sended />
      <MessageBox />
      <MessageBox sended />
      <MessageBox />
      <MessageBox sended />
      <MessageBox />
      <MessageBox sended />
      <MessageBox />
      <MessageBox sended />
      <MessageBox />
      <MessageBox sended />
      <MessageBox />
      <MessageBox sended />
      <MessageBox />
      <MessageBox sended />
      <MessageBox />
      <MessageBox sended />
      <MessageBox />
      <MessageBox sended />
    </Box>
  );
};

export default MessagesContainer;
