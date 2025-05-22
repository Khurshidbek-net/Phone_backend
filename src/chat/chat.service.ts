import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { PhoneService } from '../phone/phone.service';

@Injectable()
export class ChatService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly phoneService: PhoneService
  ) {}

  async findOne(chatId: number) {
    return this.prisma.chat.findUnique({
      where: { id: chatId },
      include: {
        messages: {
          orderBy: { sentAt: 'asc' }
        },
        Phone: true
      }
    });
  }

  async findUserChats(userId: number) {
    const senderChats = await this.prisma.chat.findMany({
      where: { senderId: userId },
      include: {
        messages: {
          orderBy: { sentAt: 'desc' },
          take: 1
        },
        Phone: true
      }
    });

    // Then get chats where user is the phone owner
    // This assumes there's a way to find phones owned by this user
    const userPhones = await this.prisma.phone.findMany({
      where: { userId } // Adjust based on your actual schema
    });

    const phoneIds = userPhones.map(phone => phone.id);

    const receiverChats = await this.prisma.chat.findMany({
      where: {
        phoneId: { in: phoneIds },
        senderId: { not: userId } // Exclude chats where user is also sender
      },
      include: {
        messages: {
          orderBy: { sentAt: 'desc' },
          take: 1
        },
        Phone: true
      }
    });

    // Combine and return all chats
    return [...senderChats, ...receiverChats];
  }

  // Get phone with owner details
  async getPhoneWithOwner(phoneId: number) {
    return this.prisma.phone.findUnique({
      where: { id: phoneId },
      include: {
        User: true
      }
    });
  }

  // Create or open a chat between a sender and a product
  async openChat(senderId: number, phoneId: number) {
    // Check if chat already exists
    let chat = await this.prisma.chat.findFirst({
      where: {
        senderId: senderId,
        phoneId: phoneId
      },
      include: {
        messages: {
          orderBy: { sentAt: 'desc' },
          take: 1
        },
        Phone: true
      }
    });

    if (!chat) {
      chat = await this.prisma.chat.create({
        data: {
          senderId: senderId,
          phoneId: phoneId
        },
        include: {
          messages: true,
          Phone: true
        }
      });
    }

    return chat;
  }

}
