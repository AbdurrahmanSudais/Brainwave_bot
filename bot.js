const TelegramBot = require('node-telegram-bot-api');
const math = require('mathjs');

// Replace with your bot token
const token = '8016191385:AAEGhu97sHcjePlJ2M166Gf7TZ3GXpISv64';

// Create a bot instance
const bot = new TelegramBot(token, { polling: true });

// Start Command
bot.onText(/\/start/, (msg) => {
    bot.sendMessage(msg.chat.id, "Welcome to BrainWave 🤓🤓™! Use /calculator <expression> or /Google <query>.");
});

// Calculator Command (Now Direct)
bot.onText(/\/calculator (.+)/, (msg, match) => {
    const chatId = msg.chat.id;
    const expression = match[1];

    try {
        const result = math.evaluate(expression);
        bot.sendMessage(chatId, `The result of ${expression} is ${result}`);
    } catch (error) {
        bot.sendMessage(chatId, "Invalid expression. Try again.");
    }
});

// Google Search Command (Direct Link)
bot.onText(/\/Google (.+)/, (msg, match) => {
    const chatId = msg.chat.id;
    const query = match[1];
    const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
    bot.sendMessage(chatId, `Here’s your search result: [Google it](${searchUrl})`, { parse_mode: "Markdown" });
});

// Unknown Command
bot.on('message', (msg) => {
    if (!msg.text.startsWith('/')) return; // Ignore normal messages
    bot.sendMessage(msg.chat.id, "I didn't understand that. Use /calculator <expression> or /Google <query>.");
});
