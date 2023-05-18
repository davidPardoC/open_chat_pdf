import { AttachmentIcon } from "@chakra-ui/icons";
import {
  Badge,
  Box,
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";

type ModalProps = {
  onClose: () => void;
};

const UploadFileModal = ({ onClose }: ModalProps) => {
  return (
    <Modal isOpen onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Upload File</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Flex justifyContent={"center"}>
            <Flex flexDirection={"column"} alignItems={"center"}>
              <Box
                border={"1px solid black"}
                width={"fit-content"}
                padding={10}
                borderRadius={"50%"}
              >
                <AttachmentIcon boxSize={"2em"} />
              </Box>
              <Flex alignItems={"center"} marginTop={3}>
                Drop file or{" "}
                <Box marginLeft={1} textDecor={"underline"}>
                  Click Here
                </Box>
              </Flex>
            </Flex>
          </Flex>
        </ModalBody>
        <ModalFooter>
          <Button>Upload</Button>
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default UploadFileModal;
