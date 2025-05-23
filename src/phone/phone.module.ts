import { forwardRef, Module } from '@nestjs/common';
import { PhoneService } from './phone.service';
import { PhoneController } from './phone.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { AccessTokenStrategy } from '../common/strategies';
import { BotModule } from '../bot/bot.module';
import { ArchivesModule } from '../archives/archives.module';

@Module({
  imports: [PrismaModule, forwardRef(() => BotModule)],
  controllers: [PhoneController],
  providers: [PhoneService, AccessTokenStrategy],
  exports: [PhoneService],
})
export class PhoneModule {}
