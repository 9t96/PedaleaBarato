/*
  Warnings:

  - The `price` column on the `Bicycle` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `oldPrice` column on the `Bicycle` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Bicycle" ADD COLUMN     "lastScrapedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
DROP COLUMN "price",
ADD COLUMN     "price" DECIMAL(65,30) NOT NULL DEFAULT 0,
DROP COLUMN "oldPrice",
ADD COLUMN     "oldPrice" DECIMAL(65,30) NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE "PriceHistory" (
    "id" SERIAL NOT NULL,
    "bicycleId" INTEGER NOT NULL,
    "price" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "oldPrice" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "discount" TEXT NOT NULL DEFAULT '0',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PriceHistory_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "PriceHistory" ADD CONSTRAINT "PriceHistory_bicycleId_fkey" FOREIGN KEY ("bicycleId") REFERENCES "Bicycle"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
