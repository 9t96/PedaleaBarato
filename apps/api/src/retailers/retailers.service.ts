import { Injectable } from '@nestjs/common';
import { PrismaClientService } from '../prisma-client/prisma-client.service.js';
import { Retailer } from '@pedalea-barato/database';

@Injectable()
export class RetailersService {
    constructor(private readonly prismaClient: PrismaClientService){}
    async getRetailers(): Promise<Retailer[]> {
        const retailers = await this.prismaClient.retailer.findMany();
        return retailers;
    }
}
