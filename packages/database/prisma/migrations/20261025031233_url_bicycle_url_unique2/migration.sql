/*
  Warnings:

  - A unique constraint covering the columns `[productUrl]` on the table `Bicycle` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Bicycle_productUrl_key" ON "Bicycle"("productUrl");
