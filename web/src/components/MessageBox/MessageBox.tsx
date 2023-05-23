import { Box, Flex } from "@chakra-ui/react";

const MessageBox = ({ sended }: { sended?: boolean }) => {
  return (
    <Flex justifyContent={sended ? "flex-end" : "flex-start"} marginBottom={5}>
      <Box
        bg={!sended ? "white" : "primary"}
        color={!sended ? "black" : "white"}
        maxWidth={"60%"}
        borderRadius={5}
        padding={1}
      >
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto, quos
        expedita rem at tempore itaque! Doloribus dicta.
      </Box>
    </Flex>
  );
};

export default MessageBox;
