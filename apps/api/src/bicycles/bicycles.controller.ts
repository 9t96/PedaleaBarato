import { Controller, Get, Param } from '@nestjs/common';
import { BicyclesService } from './bicycles.service.js';

@Controller('bicycles')
export class BicyclesController {
    constructor(private readonly bicyclesService: BicyclesService){}
    @Get()
    getBicycles(): Object {
        return this.bicyclesService.getByciclesByName('bicicleta');
    }

    @Get('search/:text')
    getBicyclesBySearch(@Param()  text:any ): Object {
        return this.bicyclesService.getByciclesByName(text.text);
    }
}
