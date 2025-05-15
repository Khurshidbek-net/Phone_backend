import { Injectable } from '@nestjs/common';
import { CreateImageDto } from './dto/create-image.dto';
import { UpdateImageDto } from './dto/update-image.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ImageService {

  constructor(private readonly primsa: PrismaService) { }
  
  async create(createImageDto: CreateImageDto) {
    return this.primsa.image.create({ data: createImageDto});
  }

  async findAll() {
    return await this.primsa.image.findMany({include: {Phone: true}});
  }

  async findOne(id: number) {
    const result = await this.primsa.region.findUnique({where : {id}});
    if(!result){
      throw new Error('Rasm Topilmadi')
    }
    return result;
  }

  async update(id: number, updateImageDto: UpdateImageDto) {
    return await this.primsa.color.update({
      where: {id},
      data: {...updateImageDto},
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    await this.primsa.image.delete({where: {id}});
    return {message: "Rasm juda ham chiryli O'chirildi"} ;
  }
}
