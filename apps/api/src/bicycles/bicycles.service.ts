import { Injectable } from '@nestjs/common';

@Injectable()
export class BicyclesService {
    getBycicles(): Object {
        return {
            count: 0,
            bicycles: []
        };
    }
}
