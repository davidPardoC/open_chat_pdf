import { AddIcon } from "@chakra-ui/icons";
import { Button, Flex } from "@chakra-ui/react";
import { useState } from "react";
import UploadFileModal from "../UploadFileModal/UploadFileModal";

const LibraryHeader = () => {
  const [openModal, setOpenModal] = useState<boolean>(false);

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <Flex justifyContent={"flex-end"}>
      <Button variant={"primary"} onClick={handleOpenModal}>
        Agregar Documento <AddIcon marginLeft={2} />{" "}
      </Button>
      {openModal && <UploadFileModal onClose={handleCloseModal} />}
    </Flex>
  );
};

export default LibraryHeader;
