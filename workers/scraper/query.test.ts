import assert from "node:assert/strict";
import { afterEach, beforeEach, describe, it, mock } from "node:test";
import type { Retailer, BicycleScraped } from "./types/types.ts";

const tx = {
  bicycle: {
    findUnique: mock.fn(async (_args: unknown): Promise<{ id: number; price: number } | null> => null),
    create: mock.fn(async (_args: unknown) => ({ id: 42 })),
    update: mock.fn(async (_args: unknown) => ({ id: 42 })),
  },
  priceHistory: {
    findFirst: mock.fn(async (_args: unknown): Promise<{ id: number; bicycleId: number } | null> => ({
      id: 100, bicycleId: 42,
    })),
    create: mock.fn(async (_args: unknown) => ({ id: 100 })),
  },
};
const prisma = {
  bicycle: {
    findMany: mock.fn(async (_args: unknown): Promise<BicycleScraped[]> => []),
  },
  retailer: {
    upsert: mock.fn(async (_args: unknown) => ({ id: 7 })),
  },
  $transaction: mock.fn(async (callback: (client: typeof tx) => Promise<unknown>) => callback(tx)),
};

mock.module("./lib/prisma.ts", { namedExports: { prisma } });
const { default: { upsertRetailer, searchByName } } = await import("./query.ts");

afterEach(() => {
  mock.restoreAll();
});

const bicycle: BicycleScraped = {
  name: "Bicicleta rodado 29",
  price: 250_000,
  oldPrice: 300_000,
  discount: "17%",
  productUrl: "https://tienda.example/bicicleta-29",
  imageUrl: "https://tienda.example/bicicleta-29.jpg",
};

function retailer(bicycles: BicycleScraped[] = [bicycle]): Retailer {
  return {
    name: "Tienda de bicicletas",
    url: "https://tienda.example",
    scrapUrl: "https://tienda.example/bicicletas",
    bicycles,
  };
}

function assertHistory(price: number, startedAt: number) {
  assert.equal(tx.priceHistory.create.mock.callCount(), 1);
  const { data } = tx.priceHistory.create.mock.calls[0].arguments[0] as {
    data: { bicycleId: number; price: number; createdAt: Date };
  };
  assert.equal(data.bicycleId, 42);
  assert.equal(data.price, price);
  assert.ok(data.createdAt instanceof Date);
  assert.ok(data.createdAt.getTime() >= startedAt);
  assert.ok(data.createdAt.getTime() <= Date.now());
}

describe("searchByName", () => {
  beforeEach(() => {
    prisma.bicycle.findMany.mock.resetCalls();
    mock.method(console, "log", () => {});
  });

  it("busca coincidencias parciales sin distinguir mayúsculas y devuelve las bicicletas encontradas", async () => {
    const bicycles = [{ ...bicycle, name: "Trinx rodado 29" }];
    prisma.bicycle.findMany.mock.mockImplementationOnce(async () => bicycles);

    const result = await searchByName("TrInX");

    assert.equal(prisma.bicycle.findMany.mock.callCount(), 1);
    assert.deepEqual(prisma.bicycle.findMany.mock.calls[0].arguments, [{
      where: { name: { contains: "TrInX", mode: "insensitive" } },
    }]);
    assert.deepEqual(result, bicycles);
  });

  it("devuelve una lista vacía cuando no hay coincidencias", async () => {
    assert.deepEqual(await searchByName("inexistente"), []);
  });

  it("propaga los errores de la consulta", async () => {
    const error = new Error("No se pudo buscar bicicletas");
    prisma.bicycle.findMany.mock.mockImplementationOnce(async () => { throw error; });

    await assert.rejects(searchByName("trinx"), (caught) => caught === error);
  });
});

describe("upsertRetailer y las transacciones de bicicletas", () => {
  beforeEach(() => {
    for (const fn of [
      prisma.retailer.upsert,
      prisma.$transaction,
      tx.bicycle.findUnique,
      tx.bicycle.create,
      tx.bicycle.update,
      tx.priceHistory.findFirst,
      tx.priceHistory.create,
    ]) {
      fn.mock.resetCalls();
    }
    mock.method(console, "log", () => {});
  });

  it("crea o actualiza el comercio usando su URL como identificador", async () => {
    const input = retailer([]);
    await upsertRetailer(input);

    assert.deepEqual(prisma.retailer.upsert.mock.calls[0].arguments, [{
      create: { name: input.name, url: input.url, scrapUrl: input.scrapUrl },
      update: { scrapUrl: input.scrapUrl },
      where: { url: input.url },
    }]);
    assert.equal(prisma.retailer.upsert.mock.callCount(), 1);
    assert.equal(prisma.$transaction.mock.callCount(), 0);
  });

  it("crea una bicicleta nueva vinculada al comercio y registra su precio inicial", async () => {
    const startedAt = Date.now();
    await upsertRetailer(retailer());

    assert.equal(prisma.$transaction.mock.callCount(), 1);
    assert.deepEqual(tx.bicycle.findUnique.mock.calls[0].arguments, [{
      where: { productUrl: bicycle.productUrl },
    }]);
    assert.equal(tx.bicycle.create.mock.callCount(), 1);
    assert.deepEqual(tx.bicycle.create.mock.calls[0].arguments, [{
      data: { retailerId: 7, ...bicycle },
    }]);
    assert.equal(tx.bicycle.update.mock.callCount(), 0);
    assertHistory(bicycle.price, startedAt);
  });

  for (const previousPrice of [200_000, 300_000]) {
    it(`actualiza el precio y agrega historial cuando cambia desde ${previousPrice}`, async () => {
      tx.bicycle.findUnique.mock.mockImplementationOnce(async () => ({
        id: 42, ...bicycle, price: previousPrice,
      }));
      const startedAt = Date.now();
      await upsertRetailer(retailer());

      assert.equal(tx.bicycle.create.mock.callCount(), 0);
      assert.equal(tx.bicycle.update.mock.callCount(), 1);
      assert.deepEqual(tx.bicycle.update.mock.calls[0].arguments, [{
        where: { productUrl: bicycle.productUrl },
        data: { price: bicycle.price },
      }]);
      assertHistory(bicycle.price, startedAt);
    });
  }

  it("no modifica la bicicleta ni duplica el historial si el precio no cambia y ya tiene historial", async () => {
    tx.bicycle.findUnique.mock.mockImplementationOnce(async () => ({ id: 42, ...bicycle }));
    await upsertRetailer(retailer());

    assert.equal(tx.bicycle.findUnique.mock.callCount(), 1);
    assert.equal(tx.bicycle.create.mock.callCount(), 0);
    assert.equal(tx.bicycle.update.mock.callCount(), 0);
    assert.equal(tx.priceHistory.create.mock.callCount(), 0);
  });

  for (const previousPrice of [bicycle.price, 200_000]) {
    it(`crea un único registro inicial si la bici no tiene historial y su precio anterior es ${previousPrice}`, async () => {
      tx.bicycle.findUnique.mock.mockImplementationOnce(async () => ({
        id: 42, ...bicycle, price: previousPrice,
      }));
      tx.priceHistory.findFirst.mock.mockImplementationOnce(async () => null);
      const startedAt = Date.now();

      await upsertRetailer(retailer());

      assert.equal(tx.priceHistory.findFirst.mock.callCount(), 1);
      assert.deepEqual(tx.priceHistory.findFirst.mock.calls[0].arguments, [{
        where: { bicycleId: 42 },
      }]);
      assert.equal(tx.bicycle.create.mock.callCount(), 0);
      assert.equal(tx.bicycle.update.mock.callCount(), previousPrice === bicycle.price ? 0 : 1);
      assertHistory(bicycle.price, startedAt);
    });
  }

  it("procesa todas las bicicletas en transacciones individuales y espera que terminen", async () => {
    const secondBicycle = { ...bicycle, productUrl: "https://tienda.example/otra", price: 0 };
    await upsertRetailer(retailer([bicycle, secondBicycle]));

    assert.equal(prisma.$transaction.mock.callCount(), 2);
    assert.equal(tx.bicycle.create.mock.callCount(), 2);
    assert.deepEqual(tx.bicycle.findUnique.mock.calls.map((call) => call.arguments[0]), [
      { where: { productUrl: bicycle.productUrl } },
      { where: { productUrl: secondBicycle.productUrl } },
    ]);
    assert.deepEqual(tx.priceHistory.create.mock.calls.map((call) => {
      const { data } = call.arguments[0] as { data: { price: number } };
      return data.price;
    }), [bicycle.price, 0]);
  });

  it("propaga el error del comercio sin iniciar transacciones", async () => {
    const error = new Error("No se pudo guardar el comercio");
    prisma.retailer.upsert.mock.mockImplementationOnce(async () => { throw error; });

    await assert.rejects(upsertRetailer(retailer()), (caught) => caught === error);
    assert.equal(prisma.$transaction.mock.callCount(), 0);
  });

  it("propaga errores al crear una bicicleta sin intentar guardar su historial", async () => {
    const error = new Error("No se pudo crear la bicicleta");
    tx.bicycle.create.mock.mockImplementationOnce(async () => { throw error; });

    await assert.rejects(upsertRetailer(retailer()), (caught) => caught === error);
    assert.equal(tx.priceHistory.create.mock.callCount(), 0);
  });

  it("propaga errores al actualizar el precio sin agregar historial", async () => {
    tx.bicycle.findUnique.mock.mockImplementationOnce(async () => ({ id: 42, price: 1 }));
    const error = new Error("No se pudo actualizar el precio");
    tx.bicycle.update.mock.mockImplementationOnce(async () => { throw error; });

    await assert.rejects(upsertRetailer(retailer()), (caught) => caught === error);
    assert.equal(tx.priceHistory.create.mock.callCount(), 0);
  });

  it("propaga errores al guardar el historial dentro de la transacción", async () => {
    const error = new Error("No se pudo guardar el historial");
    tx.priceHistory.create.mock.mockImplementationOnce(async () => { throw error; });

    await assert.rejects(upsertRetailer(retailer()), (caught) => caught === error);
    assert.equal(tx.bicycle.create.mock.callCount(), 1);
  });
});
