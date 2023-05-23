import { Box, Flex, Skeleton, Stack } from "@chakra-ui/react";
import { Message } from "../../stores/messages.stores";
import { motion } from "framer-motion";

const MessageBox = ({ text, sended, isLoading }: Message) => {
  return (
    <Flex justifyContent={sended ? "flex-end" : "flex-start"} marginBottom={5}>
      <motion.div
        initial={{ x: sended ? 1000 : 0 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.1 }}
        style={{ maxWidth: "60%" }}
      >
        <Box
          bg={!sended ? "white" : "primary"}
          color={!sended ? "black" : "white"}
          borderRadius={5}
          padding={1}
          marginRight={1}
        >
          {text}
          {isLoading && (
            <Stack>
              <Skeleton
                height={"10px"}
                minWidth={["150px", "300px"]}
                startColor={"primary"}
              />
              <Skeleton height={"10px"} startColor={"primary"} />
              <Skeleton height={"10px"} startColor={"primary"} />
            </Stack>
          )}
        </Box>
      </motion.div>
    </Flex>
  );
};

export default MessageBox;
