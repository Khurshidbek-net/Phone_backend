import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { Email, PhoneNumber } from '../../generated/prisma';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}
  async create(dto: CreateUserDto) {
    const { email, phoneNumber, password } = dto;

    // Step 1: Validate email
    if (email) {
      const existingEmail = await this.prisma.email.findUnique({
        where: { email },
      });
      if (existingEmail) throw new ConflictException('Email already in use.');
    }

    // Step 2: Validate phone
    if (phoneNumber) {
      const existingPhone = await this.prisma.phoneNumber.findUnique({
        where: { phone: phoneNumber },
      });
      if (existingPhone)
        throw new ConflictException('Phone number already in use.');
    }

    // Step 3: Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await this.prisma.user.create({
      data: {
        firstName: dto.name,
        password: hashedPassword,
        isActive: dto.isActive,
        activation_link: dto.activation_link || null,
      },
    });

    let emailRecord: Email | null = null;
    let phoneRecord: PhoneNumber | null = null;

    if (email) {
      emailRecord = await this.prisma.email.create({
        data: {
          email,
          user: { connect: { id: user.id } },
        },
      });
    }

    if (phoneNumber) {
      phoneRecord = await this.prisma.phoneNumber.create({
        data: {
          phone: phoneNumber,
          user: { connect: { id: user.id } },
        },
      });
    }

    const updatedUser = await this.prisma.user.update({
      where: { id: user.id },
      data: {
        ...(emailRecord ? { mainEmailId: emailRecord.id } : {}),
        ...(phoneRecord ? { mainPhoneId: phoneRecord.id } : {}),
      },
      include: {
        mainEmail: true,
        mainPhone: true,
      },
    });

    return updatedUser;
  }

  async findAll() {
    return await this.prisma.user.findMany({
      where: { isDeleted: false },
      include: {
        PhoneNumbers: true,
        Emails: true,
        district: true,
        mainEmail: true,
        mainPhone: true,
        language: true,
        Phone: true,
        Address: true
      },
    });
  }

  async findOne(id: number) {
    return await this.prisma.user.findFirst({
      where: {
        id,
        isDeleted: false,
      },
      include: {
        PhoneNumbers: true,
        Emails: true,
        district: true,
        mainEmail: true,
        mainPhone: true,
        language: true,
      },
    });
  }

  async activate(link: string) {
    if (!link) {
      throw new NotFoundException('Activation link not found');
    }

    const user = await this.prisma.user.findFirst({
      where: {
        activation_link: link,
        isActive: false,
      },
    });

    if (!user) {
      throw new BadRequestException('User already activated');
    }

    const updatedUser = await this.prisma.user.update({
      where: { id: user.id },
      data: { isActive: true },
    });

    const response = {
      message: 'User activated successfully',
      isActive: updatedUser.isActive,
    };
    return response;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return await this.prisma.user.update({
      where: { id },
      data: updateUserDto,
      include: {
        PhoneNumbers: true,
        Emails: true,
        district: true,
        mainEmail: true,
        mainPhone: true,
        language: true,
      },
    });
  }

  async updateProfileImage(id: number, filename: string) {
    return await this.prisma.user.update({
      where: { id },
      data: { image: filename },
    });
  }

  async remove(id: number) {
    return this.prisma.user.update({
      where: { id },
      data: { isDeleted: true, isActive: false },
    });
  }

  async setMainEmail(userId: number, emailId: number) {
    const email = await this.prisma.email.findUnique({
      where: { id: emailId },
    });

    if (!email) throw new NotFoundException('Email not found');
    if (email.userId !== userId)
      throw new ForbiddenException('Email does not belong to user');

    return this.prisma.user.update({
      where: { id: userId },
      data: { mainEmailId: emailId },
      include: { mainEmail: true },
    });
  }
  async setMainPhone(userId: number, phoneId: number) {
    const phone = await this.prisma.phoneNumber.findUnique({
      where: { id: phoneId },
    });

    if (!phone) throw new NotFoundException('Phone number not found');
    if (phone.userId !== userId)
      throw new ForbiddenException('Phone number does not belong to user');

    return this.prisma.user.update({
      where: { id: userId },
      data: { mainPhoneId: phoneId },
      include: { mainPhone: true },
    });
  }

  async findUserByPhone(phone: string) {
    const phoneRecord = await this.prisma.phoneNumber.findUnique({
      where: { phone },
      include: {
        user: {
          include: {
            mainEmail: true,
            mainPhone: true,
            Emails: true,
            PhoneNumbers: true,
          },
        },
      },
    });

    if (!phoneRecord) {
      throw new NotFoundException('User with this phone number not found.');
    }

    return phoneRecord.user;
  }

  async findUserByEmail(email: string) {
    const emailRecord = await this.prisma.email.findUnique({
      where: { email },
      include: {
        user: {
          include: {
            mainEmail: true,
            mainPhone: true,
            Emails: true,
            PhoneNumbers: true,
          },
        },
      },
    });

    if (!emailRecord) {
      throw new NotFoundException('User with this email not found.');
    }

    return emailRecord.user;
  }

  async findUserByEmailOrPhone(email: string, phone: string) {
    const user = await this.prisma.user.findFirst({
      where: {
        OR: [{ mainEmail: { email } }, { mainPhone: { phone } }],
      },
      include: {
        mainEmail: true,
        mainPhone: true,
        Emails: true,
        PhoneNumbers: true,
      },
    });

    return user;
  }

  async updateRefreshToken(id: number, hashedRefreshToken: string | null) {
    const updatedRealtor = await this.prisma.user.update({
      where: { id },
      data: { hashedToken: hashedRefreshToken },
    });

    return updatedRealtor;
  }
}
