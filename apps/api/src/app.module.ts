import { Module } from '@nestjs/common';
import { createObserveModule } from '@nestjs/observe';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { RetailersModule } from './retailers/retailers.module.js';
import { BicyclesController } from './bicycles/bicycles.controller.js';
import { BicyclesService } from './bicycles/bicycles.service.js';
import { BicyclesModule } from './bicycles/bicycles.module.js';

export const { ObserveModule, ObserveInstrument } = createObserveModule();

@Module({
  imports: [
    // Distributed tracing, auto-correlated logs, request/job metrics, error
    // telemetry, alarms, and more — out of the box. Sign up at https://observe.nestjs.com
    ObserveModule.forRoot({
      appKey: 'YOUR_APP_KEY',
      appSecret: 'YOUR_APP_SECRET',
      serviceId: 'api',
    }),
    RetailersModule,
    BicyclesModule,
  ],
  controllers: [AppController, BicyclesController],
  providers: [AppService, BicyclesService],
})
export class AppModule {}
