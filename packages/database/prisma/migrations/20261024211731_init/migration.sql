-- CreateTable
CREATE TABLE "Retailers" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "url" TEXT NOT NULL,

    CONSTRAINT "Retailers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Bicycle" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "oldPrice" DOUBLE PRECISION NOT NULL,
    "productUrl" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "retailerId" INTEGER NOT NULL,

    CONSTRAINT "Bicycle_pkey" PRIMARY KEY ("id")
);
