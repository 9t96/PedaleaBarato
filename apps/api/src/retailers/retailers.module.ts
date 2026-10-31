import { Module } from '@nestjs/common';
import { RetailersController } from './retailers.controller.js';
import { RetailersService } from './retailers.service.js';

@Module({
  controllers: [RetailersController],
  providers: [RetailersService]
})
export class RetailersModule {}
