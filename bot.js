const TelegramBot = require('node-telegram-bot-api');
const math = require('mathjs');

const token = '8016191385:AAEGhu97sHcjePlJ2M166Gf7TZ3GXpISv64';
const bot = new TelegramBot(token, { polling: true });

console.log("🤓 BrainWave is running...");

// 📌 Handle /start command
bot.onText(/\/start/, (msg) => {
    bot.sendMessage(msg.chat.id, "Welcome to BrainWave 🤓🤓™! I can solve advanced math problems. Use /calculator followed by your question.");
});

// 📌 Universal AI Calculator
bot.onText(/\/calculator (.+)/, (msg, match) => {
    const chatId = msg.chat.id;
    const query = match[1].trim();

    try {
        let result = math.evaluate(query); // Evaluates any valid math expression
        bot.sendMessage(chatId, `📌 Result:\n *${result}*`, { parse_mode: "Markdown" });

    } catch (error) {
        bot.sendMessage(chatId, "❌ Sorry, I couldn't understand that. Try another format.");
    }
});

// Handle errors
bot.on('polling_error', (error) => console.error("⚠️ Polling error:", error));
