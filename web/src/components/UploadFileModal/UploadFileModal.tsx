import { AttachmentIcon } from "@chakra-ui/icons";
import {
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
  chakra,
  Icon,
} from "@chakra-ui/react";
import { isValidMotionProp, motion } from "framer-motion";
import React, { useRef, useState } from "react";
import { BsFiletypePdf } from "react-icons/bs";
import DocumentServices from "../../services/document.services";

type ModalProps = {
  onClose: () => void;
};

const ChakraBox = chakra(motion.div, { shouldForwardProp: isValidMotionProp });

const UploadFileModal = ({ onClose }: ModalProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File>();

  const handleChange = function (e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = function (e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      if (e.dataTransfer.files[0]) {
        const { type } = e.dataTransfer.files[0] as File;
        if (!type.includes("pdf")) {
          return;
        }
      }
      setFile(e.dataTransfer.files[0] as File);
    }
  };

  const onClikUploadFile = () => {
    inputRef.current?.click();
  };

  const uploadFile = async () => {
    if (!file) {
      return;
    }
    const formData = new FormData();
    formData.append("file", file);
    const data = await DocumentServices.uploadFile(formData);
    console.log(data);
    onClose();
  };

  return (
    <Modal isOpen onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent
        boxShadow={"0px 0px 10px 10px rgba(255,255,255,.15)"}
        bg={"rgb(6, 2, 36)"}
        color={"white"}
      >
        <ModalHeader>Upload File</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {file ? (
            <Flex flexDirection={"column"} alignItems={"center"}>
              <Icon as={BsFiletypePdf} boxSize={20} />
              <Box as="p" textAlign={"center"} marginTop={3}>
                {file.name}
              </Box>
            </Flex>
          ) : (
            <Flex justifyContent={"center"}>
              <Flex
                flexDirection={"column"}
                alignItems={"center"}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <Flex
                  width={"fit-content"}
                  justifyContent={"center"}
                  alignItems={"center"}
                  onClick={onClikUploadFile}
                  _hover={{ cursor: "pointer" }}
                >
                  <input
                    ref={inputRef}
                    type="file"
                    style={{ width: "0px" }}
                    onChange={handleChange}
                    accept=".pdf"
                  />
                  <AttachmentIcon boxSize={"2em"} position={"absolute"} />
                  <ChakraBox
                    bgGradient="linear(to-l, #7928CA, #FF0080)"
                    width="100px"
                    height="100px"
                    borderRadius={"50%"}
                    opacity={0.5}
                    animate={{ scale: [1, 1.2, 1] }}
                    // @ts-ignore no problem in operation, although type error appears.
                    transition={{
                      duration: 3,
                      ease: "easeInOut",
                      repeat: Infinity,
                      repeatType: "loop",
                    }}
                  ></ChakraBox>
                </Flex>

                <Flex alignItems={"center"} marginTop={3}>
                  Drop file or{" "}
                  <Box
                    onClick={onClikUploadFile}
                    marginLeft={1}
                    textDecor={"underline"}
                    _hover={{ cursor: "pointer" }}
                  >
                    Click Here
                  </Box>
                </Flex>
              </Flex>
            </Flex>
          )}
        </ModalBody>
        <ModalFooter>
          <Button variant={"secondary"} onClick={onClose}>
            Cancel
          </Button>
          <Button marginLeft={4} variant={"primary"} onClick={uploadFile}>
            Upload
          </Button>
        </ModalFooter>
      </ModalContent>
      F
    </Modal>
  );
};

export default UploadFileModal;
