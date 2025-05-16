import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UploadedFile,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags('Admin')
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post()
  @UsePipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: false,
    }),
  )
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Admin yaratish uchun malumotlar',
    schema: {
      type: 'object',
      properties: {
        firstname: { type: 'string', example: 'Ali' },
        lastname: { type: 'string', example: 'Valiyev' },
        phone_number: { type: 'string', example: '+998901234567' },
        email: { type: 'string', example: 'ali@example.com' },
        password: { type: 'string' },
        image: {
          type: 'string',
          format: 'binary',
        },
      },
      required: ['firstname', 'lastname', 'phone_number', 'email', 'password'],
    },
  })
  @UseInterceptors(FileInterceptor('image'))
  create(
    @Body() createAdminDto: CreateAdminDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    return this.adminService.create(createAdminDto, file);
  }

  @Get()
  findAll() {
    return this.adminService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.adminService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAdminDto: UpdateAdminDto) {
    return this.adminService.update(+id, updateAdminDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.adminService.remove(+id);
  }
}
