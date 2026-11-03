/*
  Warnings:

  - You are about to alter the column `price` on the `Bicycle` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Integer`.
  - You are about to alter the column `oldPrice` on the `Bicycle` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Integer`.

*/
-- AlterTable
ALTER TABLE "Bicycle" ALTER COLUMN "discount" SET DEFAULT '',
ALTER COLUMN "price" SET DEFAULT 0,
ALTER COLUMN "price" SET DATA TYPE INTEGER,
ALTER COLUMN "oldPrice" SET DEFAULT 0,
ALTER COLUMN "oldPrice" SET DATA TYPE INTEGER;
