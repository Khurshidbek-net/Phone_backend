import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { CreatePhoneDto } from './dto/create-phone.dto';
import { UpdatePhoneDto } from './dto/update-phone.dto';
import { PrismaService } from '../prisma/prisma.service';
import { BotService } from '../bot/bot.service';

@Injectable()
export class PhoneService {
  constructor(
    private readonly prisma: PrismaService,
    @Inject(forwardRef(() => BotService))
    private readonly botService: BotService,
  ) { }
  async create(createPhoneDto: CreatePhoneDto) {
    const phone = await this.prisma.phone.create({
      data: {
        ...createPhoneDto,
      },
    });
    const phone2 = await this.findOne(phone.id);
    const message = `📢 <b>Yangi e'lon</b>
💬 ${phone2?.title}
📝 <b>Tavsif:</b> ${phone2?.description}
📱 <b>Brand:</b> ${phone2?.Brands?.name}
📱 <b>Model:</b> ${phone2?.Models?.name}
🧠 <b>RAM:</b> ${phone.ram} 
🧠 <b>ROM:</b> ${phone.rom}
💵 <b>Narx:</b> ${phone2?.price} ${phone2?.Currency?.name}
🎨 <b>Rangi:</b> ${phone2?.Color?.name}
📄 <b>Hujjat:</b> ${phone2?.box_with_document ? 'Mavjud' : 'Mavjud Emas'}
📦 <b>Holati:</b> ${phone2?.is_new ? 'Yangi' : 'Ishlatilgan'}
💲 <b>Kelishiladi:</b> ${phone2?.is_negotiable ? 'Ha' : "Yo'q"}
📍 <b>Manzil:</b> ${phone2?.Address?.address}

🕒 <b>E'lon vaqti:</b> ${phone2?.posted_date.toLocaleString()}`;

    await this.botService.sendAdToAdmin(message, phone.id);
    return phone;
  }

  async approveAdvertise(advertiseId: number) {
    return this.prisma.phone.update({
      where: { id: advertiseId },
      data: { is_checked: true },
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
        Address: true,
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
        Address: true,
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
    await this.findOne(id);
    await this.prisma.phone.update({
      where: { id },
      data: { is_deleted: true },
    });
    return { message: 'Phone deleted successfully' };
  }
}
