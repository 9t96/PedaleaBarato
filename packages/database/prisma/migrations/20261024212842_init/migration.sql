/*
  Warnings:

  - Added the required column `scrapUrl` to the `Retailers` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Bicycle" ALTER COLUMN "oldPrice" SET DEFAULT 0,
ALTER COLUMN "imageUrl" SET DEFAULT '';

-- AlterTable
ALTER TABLE "Retailers" ADD COLUMN     "scrapUrl" TEXT NOT NULL;
