import { Module } from '@nestjs/common';
import { PhoneService } from './phone.service';
import { PhoneController } from './phone.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { AccessTokenStrategy } from '../common/strategies';
import { ChatModule } from '../chat/chat.module';

@Module({
  imports: [PrismaModule],
  controllers: [PhoneController],
  providers: [PhoneService, AccessTokenStrategy],
})
export class PhoneModule {}
