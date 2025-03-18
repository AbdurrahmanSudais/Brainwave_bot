const TelegramBot = require('node-telegram-bot-api');
const axios = require('axios');

// Replace with your bot token
const token = '8016191385:AAEGhu97sHcjePlJ2M166Gf7TZ3GXpISv64';

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, { polling: true });

// Welcome message
bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, "Welcome to BrainWave 🤓🤓™! I'm here to help you with scientific and mathematical queries. Use /calculator or /Google to get started!");
});

// Calculator command
bot.onText(/\/calculator/, (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, "Please send me a mathematical expression (e.g., 2 + 2, 3 * (4 + 5)) and I'll calculate it for you.");
    bot.once('message', (msg) => {
        const expression = msg.text;
        try {
            const result = eval(expression);
            bot.sendMessage(chatId, `The result of ${expression} is ${result}`);
        } catch (error) {
            bot.sendMessage(chatId, "Sorry, I couldn't evaluate that expression. Please try again.");
        }
    });
});

// Google command
bot.onText(/\/Google (.+)/, async (msg, match) => {
    const chatId = msg.chat.id;
    const query = match[1];
    const url = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
    bot.sendMessage(chatId, `Here are the search results for "${query}": ${url}`);
});

// Handle unknown commands
bot.onText(/\/(.*)/, (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, "I didn't understand that command. Please use /calculator or /Google.");
});
