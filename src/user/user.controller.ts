import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UseGuards, UploadedFile, UseInterceptors } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBody, ApiConsumes, ApiOperation, ApiParam } from '@nestjs/swagger';
import { UpdateMainEmailDto } from './dto/update-main-email.dto';
import { UpdateMainPhoneDto } from './dto/update-main-phone.dto';
import { UserSelfGuard } from '../common/guards/user-self.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { extname } from 'path';
import { diskStorage } from 'multer';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @UseGuards(UserSelfGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @UseGuards(UserSelfGuard)
  @Patch(':id/main-email')
  @ApiOperation({ summary: 'Set user main email' })
  async updateMainEmail(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateMainEmailDto: UpdateMainEmailDto,
  ) {
    const { emailId } = updateMainEmailDto;
    return this.userService.setMainEmail(id, emailId);
  }

  @UseGuards(UserSelfGuard)
  @Patch(':id/main-phone')
  @ApiOperation({ summary: 'Set user main phone' })
  async updateMainPhone(
    @Param('id', ParseIntPipe) userId: number,
    @Body() updateMainPhonwDto: UpdateMainPhoneDto,
  ) {
    const { phoneId } = updateMainPhonwDto;
    return this.userService.setMainPhone(userId, phoneId);
  }

  @Post(':id/profile-image')
  @ApiOperation({ summary: 'Upload profile image' })
  @ApiConsumes('multipart/form-data')
  @ApiParam({ name: 'id', type: Number })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads/profile-images',
        filename: (req, file, cb) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(null, uniqueSuffix + extname(file.originalname));
        },
      }),
    }),
  )
  async uploadProfileImage(
    @Param('id', ParseIntPipe) id: number,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return await this.userService.updateProfileImage(id, file.filename);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
