import { Module } from '@nestjs/common';
import { PrismaClientService } from './prisma-client.service.js';
import { ConfigModule } from '@nestjs/config';

@Module({
    imports: [ConfigModule.forRoot(),],
    providers: [PrismaClientService],
    exports: [PrismaClientService]
})
export class PrismaClientModule {
}
