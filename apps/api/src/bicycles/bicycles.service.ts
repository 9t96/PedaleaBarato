import { Injectable } from '@nestjs/common';
import { PrismaClientService } from '../prisma-client/prisma-client.service.js';
@Injectable()
export class BicyclesService {
    constructor(private readonly prismaClient: PrismaClientService){}
    async getByciclesByName(searchText: string): Promise<Object[]> {
        const bicicletas = await this.prismaClient.bicycle.findMany({
            where: {    
            name: {
                contains: searchText,
                mode: 'insensitive'
            }
            }
        });
        return bicicletas;
    }
}
