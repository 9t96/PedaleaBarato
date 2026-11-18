import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { BicyclesService } from './bicycles.service.js';
import { Bicycle } from '@pedalea-barato/database';

@Controller('bicycles')
export class BicyclesController {
    constructor(private readonly bicyclesService: BicyclesService){}
    @Get()
    getBicycles(): Promise<Bicycle[]> {
        return this.bicyclesService.getBicycles();
    }
    
    @Get('search/:text')
    getBicyclesBySearch(@Param('text')  text:string ): Promise<Bicycle[]> {
        return this.bicyclesService.getByciclesByName(text);
    }

    @Get(':retailerId')
    getBicyclesByRetailerId(@Param('retailerId',ParseIntPipe) retailerId:number ): Promise<Bicycle[]> {
        return this.bicyclesService.getByciclesByRetailerId(retailerId);
    }


}
