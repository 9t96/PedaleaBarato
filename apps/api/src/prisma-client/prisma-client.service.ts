import { Injectable } from '@nestjs/common';
import { OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient, PrismaPg } from "@pedalea-barato/database";

@Injectable()
export class PrismaClientService extends PrismaClient
  implements OnModuleInit, OnModuleDestroy{
    constructor(private configService: ConfigService) {
        try {
            const connectionString = configService.get<string>('DATABASE_URL');
            const adapter = new PrismaPg({ connectionString });
            super({ adapter });
        } catch (error) {
            console.error('Error initializing PrismaClientService:', error);
            throw error;
        }
    }
    async onModuleInit() {
        await this.$connect();
    }

    async onModuleDestroy() {
        await this.$disconnect();
    }
}
