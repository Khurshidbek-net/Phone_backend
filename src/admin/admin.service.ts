import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { FileService } from '../file/file.service';

@Injectable()
export class AdminService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly fileService: FileService,
  ) {}
  async create(createAdminDto: CreateAdminDto, file?: Express.Multer.File) {
    let imageUrl: string | undefined;
    if (file) {
      const filename = await this.fileService.saveFile(file);
      const baseUrl = process.env.BASE_URL;
      imageUrl = `${baseUrl}/images/${filename}`;
    }

    const { password, email, ...data } = createAdminDto;
    const admin = await this.prisma.admin.findFirst({
      where: { email },
    });
    if (admin) {
      throw new BadRequestException('Bunday admin mavjud');
    }
    const admin2 = await this.prisma.admin.findFirst({
      where: { phone_number: data.phone_number },
    });
    if (admin2) {
      throw new BadRequestException('Bunday telefon raqamli admin mavjud');
    }
    const hashed_password = await bcrypt.hash(password, 7);

    const newAdmin = await this.prisma.admin.create({
      data: { ...data, hashed_password, email, image: imageUrl },
    });

    return { message: 'Added successfuly', newAdmin };
  }

  async findAll() {
    return await this.prisma.admin.findMany();
  }

  async findOne(id: number) {
    const result = await this.prisma.admin.findUnique({
      where: { id },
    });
    if (!result) {
      throw new Error('Admin not found');
    }
    return result;
  }

  async update(id: number, updateAdminDto: UpdateAdminDto) {
    await this.findOne(id);
    const result = await this.prisma.admin.update({
      where: { id },
      data: updateAdminDto,
    });
    return result;
  }

  async remove(id: number) {
    await this.findOne(id);
    await this.prisma.admin.delete({ where: { id } });
    return { message: 'Admin deleted successfully' };
  }
}
