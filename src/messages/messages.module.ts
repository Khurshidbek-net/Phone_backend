import { Module } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { MessagesController } from './messages.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { ChatGateway } from '../chat/chat.gateway';
import { ChatService } from '../chat/chat.service';
import { PhoneService } from '../phone/phone.service';
import { ChatModule } from '../chat/chat.module';

@Module({
  imports:[PrismaModule, ChatModule],
  controllers: [MessagesController],
  providers: [MessagesService, ChatService, PhoneService],
})
export class MessagesModule {}
