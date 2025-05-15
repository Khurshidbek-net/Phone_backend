import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { WinstonModule } from 'nest-winston';
import { winstonConfig } from './logging/winston.logger';
import { APP_FILTER } from '@nestjs/core';
import { AllExceptionsFilter } from './logging/error.handling';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import { RegionModule } from './region/region.module';
import { DistrictModule } from './district/district.module';
import { LanguageModule } from './language/language.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    WinstonModule.forRoot(winstonConfig),
    PrismaModule,
    RegionModule,
    DistrictModule,
    LanguageModule
  ],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
    PrismaService
  ],
})
export class AppModule {}
