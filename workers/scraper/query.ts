import { prisma } from "./lib/prisma";
import { Retailer, BicycleScraped } from "./types/types";
import type { Bicycle } from "./generated/prisma/client";


// Nuevo sitio de bicicletas

// Actualizar

//O
async function upsertRetailer(retailer: Retailer) {
  // Create a new user with a post
  const newRetailer = await prisma.retailer.upsert({
    create: {
      name: retailer.name,
      url: retailer.url,
      scrapUrl: retailer.scrapUrl,
    },
    update: {
      scrapUrl: retailer.scrapUrl,
    },
    where: { url: retailer.url },
  });

  const foundBicycles = await Promise.all(
    retailer.bicycles.map(async (bicycle) => {
      const foundBicycle = await findBikeTransaction(bicycle, newRetailer.id);
      return foundBicycle;
    })
  );

  console.log("Upserted retailer:", newRetailer);
}

async function findBikeTransaction(bicycle: BicycleScraped, retailerId: number) {
  return prisma.$transaction(async (tx) => {
  // Operaciones dentro de la transacción
    let foundBicycle: Bicycle | null = await tx.bicycle.findUnique({
      where: { productUrl: bicycle.productUrl},
    });

    if (!foundBicycle) {
      foundBicycle = await tx.bicycle.create({
        data: {
          retailerId: retailerId,
          name: bicycle.name,
          price: bicycle.price,
          oldPrice: bicycle.oldPrice,
          discount: bicycle.discount,
          productUrl: bicycle.productUrl,
          imageUrl: bicycle.imageUrl,
        },
      });
      await tx.priceHistory.create({
        data: {
          bicycleId: foundBicycle.id, 
          price: bicycle.price,
          createdAt: new Date(),
        },
      });
      
    } else {
      if (foundBicycle?.price !== bicycle.price) {
        const updatedBicycle = await tx.bicycle.update({
          where: { productUrl: bicycle.productUrl },
          data: { price: bicycle.price },
        });
      }
      await tx.priceHistory.create({
        data: {
          bicycleId: foundBicycle.id,
          price: bicycle.price,
          createdAt: new Date(),
        },
      });
    }
    return foundBicycle;
  });
}

export default upsertRetailer;