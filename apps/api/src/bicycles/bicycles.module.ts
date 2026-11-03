import { Module } from '@nestjs/common';
import { BicyclesController } from './bicycles.controller.js';
import { BicyclesService } from './bicycles.service.js';
import { PrismaClientModule } from '../prisma-client/prisma-client.module.js';

@Module({
    imports: [PrismaClientModule],
    providers: [BicyclesService],
    controllers: [BicyclesController]
})
export class BicyclesModule {

}
