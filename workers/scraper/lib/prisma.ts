import "dotenv/config";
import { PrismaClient, PrismaPg } from "@pedalea-barato/database";

const connectionString = `${process.env.DATABASE_URL}`;

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

export { prisma };