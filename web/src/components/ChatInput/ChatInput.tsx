import { Button, Flex, Icon, Input } from "@chakra-ui/react";
import { BsFillSendFill } from "react-icons/bs";

const ChatInput = () => {
  return (
    <Flex
      alignItems={"center"}
      position={"absolute"}
      width={"90%"}
      bottom={0}
      paddingBottom={3}
      gap={3}
      bg={"rgb(6, 2, 36)"}
    >
      <Input />
      <Button variant={"primary"}>
        <Icon as={BsFillSendFill} />
      </Button>
    </Flex>
  );
};

export default ChatInput;
