import { Controller, Get } from '@nestjs/common';
import { BicyclesService } from './bicycles.service.js';

@Controller('bicycles')
export class BicyclesController {
    constructor(private readonly bicyclesService: BicyclesService){}
    @Get()
    getBicycles(): Object {
        return this.bicyclesService.getBycicles();
    }
}
