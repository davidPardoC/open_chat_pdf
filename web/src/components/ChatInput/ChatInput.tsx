import { Box, Button, Flex, Icon, Input } from "@chakra-ui/react";
import { BsFillSendFill } from "react-icons/bs";

const ChatInput = () => {
  return (
    <Flex alignItems={"center"} position={"sticky"}>
      <Input />
      <Button variant={"primary"}>
        <Icon as={BsFillSendFill} />
      </Button>
    </Flex>
  );
};

export default ChatInput;
