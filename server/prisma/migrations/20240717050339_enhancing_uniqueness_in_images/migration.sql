/*
  Warnings:

  - A unique constraint covering the columns `[imgUrl]` on the table `images_tb` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "images_tb_imgUrl_key" ON "images_tb"("imgUrl");
