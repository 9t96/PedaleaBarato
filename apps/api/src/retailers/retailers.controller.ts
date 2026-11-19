import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { RetailersService } from './retailers.service.js';
import { Retailer } from '@pedalea-barato/database';

@Controller('retailers')
export class RetailersController {
    constructor(private readonly retailerService: RetailersService){}
    @Get()
    getRetailers(): Promise<Retailer[]> {
        return this.retailerService.getRetailers();
    }

    @Get(":retailerId")
    getRetailerBycicles(@Param('retailerId',ParseIntPipe) retailerId:number): Promise<Retailer> {
        return this.retailerService.getRetailerBycicles(retailerId);
    }
}
