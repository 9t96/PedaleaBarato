import { Injectable } from '@nestjs/common';
import { PrismaClientService } from '../prisma-client/prisma-client.service.js';
import { Bicycle } from '@pedalea-barato/database';
@Injectable()
export class BicyclesService {
    constructor(private readonly prismaClient: PrismaClientService){}

    async getBicycles() : Promise<Bicycle[]> {
        const bicycles = await this.prismaClient.bicycle.findMany();
        return bicycles;
    }
    
    async getByciclesByName(searchText: string): Promise<Bicycle[]> {
        const bicicletas = await this.prismaClient.bicycle.findMany({
            where: {    
                OR: [
                    {
                        name: {
                            contains: searchText,
                            mode: 'insensitive'
                        }
                    },
                    {
                        retailer: {
                            name: {
                                contains: searchText,
                                mode: 'insensitive',
                            },
                        },
                    }
                ]
            }
        });
        return bicicletas;
    }
}
