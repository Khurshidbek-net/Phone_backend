import { forwardRef, Module } from '@nestjs/common';
import { PhoneService } from './phone.service';
import { PhoneController } from './phone.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { BotModule } from '../bot/bot.module';

@Module({
  imports: [PrismaModule, forwardRef(() => BotModule)],
  controllers: [PhoneController],
  providers: [PhoneService],
  exports: [PhoneService],
})
export class PhoneModule {}
