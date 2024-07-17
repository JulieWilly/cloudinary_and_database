/*
  Warnings:

  - You are about to drop the `Images` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Images";

-- CreateTable
CREATE TABLE "images_tb" (
    "id" TEXT NOT NULL,
    "imgUrl" TEXT NOT NULL,

    CONSTRAINT "images_tb_pkey" PRIMARY KEY ("id")
);
