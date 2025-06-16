import { Injectable } from '@nestjs/common';
import { Context } from 'telegraf';
import { Ctx, Start, Update } from 'nestjs-telegraf';

@Update()
@Injectable()
export class TelegramService {
  @Start()
  async onStart(@Ctx() ctx: Context) {
    await ctx.replyWithHTML(
      `<b>👋 Assalomu alaykum, ${ctx.from?.first_name || 'foydalanuvchi'}!</b>\n\n` +
      `📚 Bizning ta'lim platformamizga xush kelibsiz!\n` +
      `Quyidagi tugma orqali ilovamizga o'tishingiz mumkin:\n\n` +
      `✅ <i>Har qanday qurilmada ishlaydi</i>\n` +
      `🔒 <i>Ma'lumotlaringiz xavfsiz himoyalangan</i>`,
      {
        reply_markup: {
          inline_keyboard: [
            [
              {
                text: '📲 Ilovani ochish',
                url: 'https://t.me/sevenedubot/seveneduwebapp',
              },
            ],
          ],
        },
      },
    );
  }

}
