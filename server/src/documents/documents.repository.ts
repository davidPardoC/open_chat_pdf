import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getAll = async () => {
  const allUsers = await prisma.document.findMany();
  return allUsers;
};

const insertOne = async (
  name: string,
  path: string,
  text_parsed_path: string,
  vectorsPath: string
) => {
  const doc = await prisma.document.create({
    data: { name, path, text_parsed_path, vector_directory: vectorsPath },
  });
  return doc;
};

const getOneByPath = async (path: string) => {
  const doc = await prisma.document.findUnique({ where: { path } });
  return doc;
};

const getOneById = async (id: number) => {
  const doc = await prisma.document.findUnique({ where: { id } });
  return doc;
};

const DocumentRepository = { getAll, insertOne, getOneByPath, getOneById };

export default DocumentRepository;
