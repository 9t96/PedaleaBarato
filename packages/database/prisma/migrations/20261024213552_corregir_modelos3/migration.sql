/*
  Warnings:

  - You are about to drop the `Retailers` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Bicycle" DROP CONSTRAINT "Bicycle_retailerId_fkey";

-- DropTable
DROP TABLE "Retailers";

-- CreateTable
CREATE TABLE "Retailer" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "scrapUrl" TEXT NOT NULL,

    CONSTRAINT "Retailer_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Bicycle" ADD CONSTRAINT "Bicycle_retailerId_fkey" FOREIGN KEY ("retailerId") REFERENCES "Retailer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
