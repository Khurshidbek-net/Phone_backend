import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { Context, Telegraf } from 'telegraf';
import { PhoneService } from '../phone/phone.service';
import { InjectBot } from 'nestjs-telegraf';

@Injectable()
export class BotService {
  constructor(
    @InjectBot()
    private readonly bot: Telegraf<Context>,
    @Inject(forwardRef(() => PhoneService))
    private readonly phoneService: PhoneService,
  ) {}

  async sendAdToAdmin(text: string, advertiseId: number) {
    const adminId = process.env.ADMIN_ID as string;

    await this.bot.telegram.sendMessage(adminId, text, {
      parse_mode:"HTML",
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: '✅ Tasdiqlash',
              callback_data: `approve_${advertiseId}`,
            },
          ],
          [{ text: '❌ Bekor qilish', callback_data: `reject_${advertiseId}` }],
        ],
      },
    });
  }

  async onApprove(ctx: Context) {
    try {
      const advertiseId = ctx.callbackQuery!['data'].split('_')[1];
      if (!advertiseId) return;
      await this.phoneService.approveAdvertise(parseInt(advertiseId));
      await ctx.editMessageReplyMarkup({
        inline_keyboard: [
          [{ text: '✅ Tasdiqlandi', callback_data: 'approved' }],
        ],
      });
    } catch (error) {
      console.log('onApprove error', error);
    }
  }

  async onReject(ctx: Context) {
    try {
      // const advertiseId = ctx.callbackQuery!['data'].split('_')[1];
      // if (!advertiseId) return;
      // await this.phoneService.approveAdvertise(parseInt(advertiseId));
      await ctx.editMessageReplyMarkup({
        inline_keyboard: [
          [{ text: '❌ Bekor qilindi', callback_data: 'rejected' }],
        ],
      });
    } catch (error) {
      console.log('onReject error', error);
    }
  }
}
