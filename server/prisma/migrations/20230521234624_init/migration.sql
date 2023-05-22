-- CreateTable
CREATE TABLE "Document" (
    "id" SERIAL NOT NULL,
    "path" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Document_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Document_path_key" ON "Document"("path");
