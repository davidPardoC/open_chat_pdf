import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getAll = async () => {
  const allUsers = await prisma.document.findMany();
  return allUsers;
};

const insertOne = async (name: string, path: string) => {
  await prisma.document.create({
    data: { name, path },
  });
};

const getOneByPath = async (path: string) => {
  const doc = await prisma.document.findUnique({ where: { path } });
  return doc
};

const DocumentRepository = { getAll, insertOne , getOneByPath };

export default DocumentRepository;
