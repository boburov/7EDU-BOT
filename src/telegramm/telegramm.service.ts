import { Injectable } from '@nestjs/common';
import { Context, Telegraf } from 'telegraf';
import { InjectBot } from 'nestjs-telegraf';

@Injectable()
export class TelegramService {
  constructor(@InjectBot() private readonly bot: Telegraf<Context>) {}

  async startBot() {
    this.bot.start(async (ctx) => {
      await ctx.reply('Assalomu alaykum!', {
        reply_markup: {
          inline_keyboard: [
            [{
              text: 'Ilovani ochish',
              
              web_app: { url: 'https://t.me/sevenedubot/seveneduwebapp' }
            }]
          ]
        }
      });
    });
  }
}