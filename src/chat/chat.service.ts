import { Injectable } from '@nestjs/common';
import { CreateChatDto } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ChatService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createChatDto: CreateChatDto) {
    return await this.prisma.chat.create({ data: createChatDto });
  }

  async findAll() {
    return await this.prisma.chat.findMany({
      include: {
        Messages: true,
        Phone: true,
      },
    });
  }

  async findOne(id: number) {
    const result = await this.prisma.chat.findUnique({
      where: { id },
      include: {
        Messages: true,
        Phone: true,
      },
    });
    if (!result) {
      throw new Error('Chat not found');
    }
    return result;
  }

  async update(id: number, updateChatDto: UpdateChatDto) {
    await this.findOne(id);
    const result = await this.prisma.chat.update({
      where: { id },
      data: updateChatDto,
    });
    return result;
  }

  async remove(id: number) {
    await this.findOne(id);
    await this.prisma.chat.delete({ where: { id } });
    return { message: 'Chat deleted successfully' };
  }
}
