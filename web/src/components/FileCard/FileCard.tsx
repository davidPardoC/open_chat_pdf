import { Box, Flex, Icon } from "@chakra-ui/react";
import { BsFiletypePdf } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

type FileCardProps = {
  name: string;
  id: number;
  path?: string;
};

const truncateName = (name: string) => {
  const splitedName = name.split(".");
  const extension = splitedName[splitedName.length - 1];
  const truncatedName =
    name.length > 15
      ? `${splitedName[0].substring(0, 15)}[...]`
      : splitedName[0];
  return `${truncatedName}.${extension}`;
};

const FileCard = ({ name, id }: FileCardProps) => {
  if (!name) {
    return null;
  }

  const navigate = useNavigate();

  const onClickCard = () => {
    navigate(`/chatbook/${id}`);
  };

  return (
    <Flex
      boxShadow={"0px 0px 5px #7928CA"}
      padding={4}
      borderRadius={"5px"}
      height={"150px"}
      flexDirection={"column"}
      width={"7em"}
      alignItems={"center"}
      justifyContent={"space-between"}
      onClick={onClickCard}
    >
      <Icon as={BsFiletypePdf} boxSize={"3em"} />
      <Box as="p" textAlign={"center"} marginTop={3}>
        {truncateName(name)}
      </Box>
    </Flex>
  );
};

export default FileCard;
