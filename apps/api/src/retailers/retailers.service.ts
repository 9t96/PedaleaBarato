import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaClientService } from '../prisma-client/prisma-client.service.js';
import { Retailer } from '@pedalea-barato/database';

@Injectable()
export class RetailersService {
    constructor(private readonly prismaClient: PrismaClientService){}
    async getRetailers(): Promise<Retailer[]> {
        const retailers = await this.prismaClient.retailer.findMany();
        return retailers;
    }

    async getRetailerBycicles(retailerId: number): Promise<Retailer> {
        const retailer = await this.prismaClient.retailer.findUnique({
            where: {
                id: retailerId
            },
            include: {
                bicycles: true,
            },
        });

        if (!retailer) {
            throw(NotFoundException);
        }
        return retailer;
    }
}

