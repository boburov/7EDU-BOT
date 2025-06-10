import { Module } from '@nestjs/common';
import { TelegrafModule } from 'nestjs-telegraf';
import { TelegramService } from './telegramm.service';

@Module({
  imports: [
    TelegrafModule.forRoot({
      token: '7260865979:AAG6L_B-P7vIk9FT9nfu0OvGG32tBju29gQ',
    }),
  ],
  providers: [TelegramService],
})
export class TelegramModule {}