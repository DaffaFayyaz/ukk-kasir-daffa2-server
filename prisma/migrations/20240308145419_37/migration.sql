/*
  Warnings:

  - A unique constraint covering the columns `[id_product]` on the table `discount_detail` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `discount_detail_id_product_key` ON `discount_detail`(`id_product`);
