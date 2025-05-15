import { Injectable } from '@nestjs/common';
import { CreatePhoneDto } from './dto/create-phone.dto';
import { UpdatePhoneDto } from './dto/update-phone.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PhoneService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createPhoneDto: CreatePhoneDto) {
    return await this.prisma.phone.create({
      data: {
        ...createPhoneDto,
      },
    });
  }

  async findAll() {
    return await this.prisma.phone.findMany({
      include: {
        Currency: true,
        Models: true,
        Brands: true,
        Color: true,
        User: true,
      },
    });
  }

  async findOne(id: number) {
    const result = await this.prisma.phone.findUnique({
      where: { id },
      include: {
        Currency: true,
        Models: true,
        Brands: true,
        Color: true,
        User: true,
      },
    });
    return result;
  }

  async update(id: number, updatePhoneDto: UpdatePhoneDto) {
    const result = await this.prisma.phone.update({
      where: { id },
      data: {
        ...updatePhoneDto,
      },
    });
    if (!result) {
      throw new Error('Phone not found');
    }
    return result;
  }

  async remove(id: number) {
    await this.findOne(id)
    await this.prisma.phone.update({
      where: {id},
      data: {is_deleted: true},
    })
    return { message: 'Phone deleted successfully'};
  }
}
