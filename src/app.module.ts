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
import { CurrencyModule } from './currency/currency.module';
import { BrandModule } from './brand/brand.module';
import { ModelModule } from './model/model.module';
import { ArchivesModule } from './archives/archives.module';
import { PhoneModule } from './phone/phone.module';
import { UserModule } from './user/user.module';
import { EmailModule } from './email/email.module';
import { PhonoNumberModule } from './phone-number/phono-number.module';
import { AuthModule } from './auth/auth.module';
import { SmsModule } from './sms/sms.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    WinstonModule.forRoot(winstonConfig),
    PrismaModule,
    RegionModule,
    DistrictModule,
    LanguageModule,
    CurrencyModule,
    BrandModule,
    ModelModule,
    ArchivesModule,
    PhoneModule,
    UserModule,
    EmailModule,
    PhonoNumberModule,
    AuthModule,
    SmsModule
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
