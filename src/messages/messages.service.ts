import { Injectable } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class MessagesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createMessageDto: CreateMessageDto) {
    return await this.prisma.messages.create({ data: createMessageDto });
  }

  async findAll() {
    return await this.prisma.messages.findMany({
      include: {
        User: true,
        Chat: true,
      },
    });
  }

  async findOne(id: number) {
    const result = await this.prisma.messages.findUnique({
      where: { id },
      include: {
        User: true,
        Chat: true,
      },
    });
    if (!result) {
      throw new Error('Message not found');
    }
    return result;
  }

  async update(id: number, updateMessageDto: UpdateMessageDto) {
    await this.findOne(id);
    const result = await this.prisma.messages.update({
      where: { id },
      data: updateMessageDto,
    });
    return result;
  }

  async remove(id: number) {
    await this.findOne(id);
    await this.prisma.messages.delete({ where: { id } });
    return { message: 'Message deleted successfully' };
  }
}
