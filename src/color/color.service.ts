import { Injectable } from '@nestjs/common';
import { CreateColorDto } from './dto/create-color.dto';
import { UpdateColorDto } from './dto/update-color.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ColorService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createColorDto: CreateColorDto) {
    return this.prisma.color.create({data: createColorDto});
  }

  async findAll() {
    return  await this.prisma.color.findMany();
  }

  async findOne(id: number) {
    const result = await this.prisma.color.findUnique({where : {id}});
    if(!result){
      throw new Error("Color topilmadi")
    }
    return result
  }

  async update(id: number, updateColorDto: UpdateColorDto) {
    return  await this.prisma.color.update({
      where: {id},
      data: {...updateColorDto}
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    await this.prisma.color.delete({where: {id}});
    return  {message: "Color Juda ham chiroyli o'chirildi "};
  }
}
