import { Controller, Get } from '@nestjs/common';
import { RetailersService } from './retailers.service.js';

@Controller('retailers')
export class RetailersController {
    constructor(private readonly retailerService: RetailersService){}
    @Get()
    getRetailers(): Object {
        return this.retailerService.getRetailers();
    }
}
