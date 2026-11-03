/*
  Warnings:

  - You are about to drop the column `discount` on the `PriceHistory` table. All the data in the column will be lost.
  - You are about to drop the column `oldPrice` on the `PriceHistory` table. All the data in the column will be lost.
  - You are about to alter the column `price` on the `PriceHistory` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Integer`.

*/
-- AlterTable
ALTER TABLE "PriceHistory" DROP COLUMN "discount",
DROP COLUMN "oldPrice",
ALTER COLUMN "price" SET DEFAULT 0,
ALTER COLUMN "price" SET DATA TYPE INTEGER;
