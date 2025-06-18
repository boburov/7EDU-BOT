import { Update, Ctx, Start } from 'nestjs-telegraf';
import { Context } from 'telegraf';

@Update()
export class BotUpdate {
  @Start()
  async startCommand(@Ctx() ctx: Context) {
    const webAppUrl = 'https://7-edu-client-ba9g.vercel.app/';

    await ctx.reply('Ilovani ochish uchun tugmani bosing:', {
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: '📲 Ilovani ochish',
              web_app: {
                url: webAppUrl,
              },
            },
          ],
        ],
      },
    });
  }
}
