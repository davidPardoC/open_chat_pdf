import { Button, Flex, Icon, Input } from "@chakra-ui/react";
import { BsFillSendFill } from "react-icons/bs";
import useChatStore from "../../stores/messages.stores";
import { useRef } from "react";
import ChatService from "../../services/chat.services";
import { useParams } from "react-router-dom";

const ChatInput = () => {
  const { appendNewMessage, setChatLoading } = useChatStore();
  const inputRef = useRef<HTMLInputElement>(null);
  const { id } = useParams();

  const sendMessage = async () => {
    if (!inputRef.current?.value) {
      return;
    }
    appendNewMessage({
      text: inputRef.current?.value as string,
      sended: true,
      bookId: Number(id),
    });
    const message = inputRef.current.value;
    inputRef.current.value = "";
    setChatLoading(true);
    const data = await ChatService.postChat(Number(id), message);
    setChatLoading(false);
    appendNewMessage({ text: data.text, sended: false, bookId: Number(id) });
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <Flex
        alignItems={"center"}
        position={"absolute"}
        width={"90%"}
        bottom={0}
        paddingBottom={3}
        gap={3}
        bg={"rgb(6, 2, 36)"}
      >
        <Input ref={inputRef} />
        <Button type="submit" variant={"primary"} onClick={sendMessage}>
          <Icon as={BsFillSendFill} />
        </Button>
      </Flex>
    </form>
  );
};

export default ChatInput;
