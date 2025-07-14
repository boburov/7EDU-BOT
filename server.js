require("dotenv").config();
const { default: axios } = require("axios");
const { Telegraf, Markup } = require("telegraf");

const bot = new Telegraf(process.env.BOT_TOKEN);

const mainKeyboard = Markup.keyboard([
  ["📚 Kurslar ro'yxati", "📝 Mavjud kurslar"],
]).resize();

const kursMap = new Map();

bot.start((ctx) => {
  const firstName = ctx.from.first_name || "Foydalanuvchi";
  ctx.replyWithHTML(
    `👋 <b>Assalomu alaykum, ${firstName}!</b>\n\n` +
    `🤖 Siz <b>7EDU AI Platformasi</b> botidasiz.\n\n` +
    `🎯 Bu yerda siz:\n` +
    `📚 <b>Kurslarga yozilasiz</b>\n` +
    `🧠 <b>Yangi so‘zlarni o‘rganasiz</b>\n` +
    `📝 <b>Testlar yechib, bilim darajangizni oshirasiz</b>\n` +
    `🎓 <b>Imtihon topshirib, sertifikat olasiz</b>\n\n` +
    `⬇️ Davom etish uchun menyudan birini tanlang:`,
    mainKeyboard
  );
});

// Kurslar menyusi
bot.hears("📝 Mavjud kurslar", async (ctx) => {
  try {
    const res = await axios.get("https://sevenedu.store/courses/all");
    const kurslar = res.data;

    if (!kurslar || kurslar.length === 0) {
      return ctx.reply("🚫 Hech qanday kurs topilmadi.");
    }

    const tugmalar = [];

    for (let i = 0; i < kurslar.length; i += 2) {
      const row = [];

      for (let j = 0; j < 2; j++) {
        const kurs = kurslar[i + j];
        if (kurs) {
          let emoji = "📘";
          const t = kurs.title.toLowerCase();
          if (t.includes("ingliz") || t.includes("english")) emoji = "🇬🇧";
          else if (t.includes("rus")) emoji = "🇷🇺";
          else if (t.includes("arab")) emoji = "🇸🇦";
          else if (t.includes("so'z") || t.includes("vocab")) emoji = "🧠";
          else if (t.includes("gaplashish") || t.includes("speaking")) emoji = "🗣️";
          else if (t.includes("grammar")) emoji = "📚";
          else if (t.includes("test") || t.includes("imtihon")) emoji = "📋";

          const label = `${emoji} ${kurs.title}`;
          kursMap.set(label, kurs);
          row.push(label);
        }
      }

      tugmalar.push(row);
    }

    ctx.reply(
      "📖 Kurslardan birini tanlang:",
      Markup.keyboard(tugmalar).resize().oneTime()
    );
  } catch (error) {
    console.error("API xatosi:", error.message);
    ctx.reply("❌ Kurslarni yuklab bo‘lmadi. Keyinroq urinib ko‘ring.");
  }
});

// Kurs haqida ma'lumot ko‘rsatish
bot.on("text", async (ctx) => {
  const matn = ctx.message.text;
  if (!kursMap.has(matn)) return;

  const kurs = kursMap.get(matn);
  const { title, thumbnail, goal, advantages = [], price, id } = kurs;

  const formattedAdvantages = advantages.length
    ? advantages.map((a) => `• ${a}`).join("\n")
    : "• Sertifikat\n• Real loyiha\n• Mentor qo‘llovi";

  const caption = `
📘 <b>${title}</b>

🎯 <b>Maqsad:</b> ${goal}

✅ <b>Afzalliklari:</b>
${formattedAdvantages}

💰 <b>Narxi:</b> 800.8000 so‘m
  `.trim();

  await ctx.replyWithPhoto(
    { url: thumbnail },
    {
      caption,
      parse_mode: "HTML",
      ...Markup.inlineKeyboard([
        [
          Markup.button.url(
            "📥 Kursga o‘tish",
            `https://t.me/sevenedubot/seveneduwebapp`
          ),
          Markup.button.url(
            "Kurs buyurtma berish",
            `https://t.me/GraffDracula?text=Assalomu%20alaykum%2C%20men%20${title}%20kursini%20sotib%20olmoqchiman.`
          )
        ]
      ])
    }
  );
});

bot.launch();
console.log("🤖 Bot ishga tushdi...");