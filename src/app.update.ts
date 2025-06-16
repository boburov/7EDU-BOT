import { Ctx, Start, Update, On } from 'nestjs-telegraf';
import { Context } from 'telegraf';

@Update()
export class AppUpdate {
  @Start()
  async onStart(@Ctx() ctx: Context) {
    const name = ctx.from?.first_name || 'do‘st';
    await ctx.reply(`Salom, ${name}! 🤖 Botga hush kelibsiz.`);
  }

  @On('text')
  async onText(@Ctx() ctx: Context) {
    const text = ctx.message && 'text' in ctx.message ? ctx.message.text : '';
    await ctx.reply(`Siz yozdingiz: "${text}"`);
  }
}
