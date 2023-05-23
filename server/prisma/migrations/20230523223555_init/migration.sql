/*
  Warnings:

  - Added the required column `chunks_path` to the `Document` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Document" ADD COLUMN     "chunks_path" TEXT NOT NULL;
