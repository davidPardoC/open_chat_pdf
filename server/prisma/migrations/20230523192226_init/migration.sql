/*
  Warnings:

  - Added the required column `vector_directory` to the `Document` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Document" ADD COLUMN     "vector_directory" TEXT NOT NULL;
