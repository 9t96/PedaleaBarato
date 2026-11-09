import { Module } from '@nestjs/common';
import { RetailersController } from './retailers.controller.js';
import { RetailersService } from './retailers.service.js';
import { PrismaClientModule } from '../prisma-client/prisma-client.module.js';

@Module({
  imports: [PrismaClientModule],
  controllers: [RetailersController],
  providers: [RetailersService]
})
export class RetailersModule {}
