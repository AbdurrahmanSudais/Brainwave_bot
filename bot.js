const TelegramBot = require('node-telegram-bot-api');
const math = require('mathjs');

const token = '8016191385:AAEGhu97sHcjePlJ2M166Gf7TZ3GXpISv64';
const bot = new TelegramBot(token, { polling: true });

console.log("🤓 BrainWave is running...");

// List of valid commands
const validCommands = ["/start", "/menu", "/help", "/channels", "/calculator", "/Google"];

// 📌 Handle /start command
bot.onText(/^\/start$/, (msg) => {
    bot.sendMessage(msg.chat.id, "Welcome to BrainWave 🤓🤓™! your friendly AI assistant😁, i might have some glitches but im still undergoing advancements😅.. Use /menu to see available commands and let's get started 🌹💫💫🔥.");
});

// 📌 Handle /menu command
bot.onText(/^\/menu$/, (msg) => {
    const menuText = `
📜 *Brainwave🤓🤓™ Commands* 📜

🔹 /calculator <query> - Solve any math problem  
🔹 /Google <query> - Search the web  
🔹 /help - Get help with commands  
🔹 /channels - Check out recommended channels  
🔹 /menu - Show this menu again
🔹_more commands coming Soon🚀🚀✊_;

    bot.sendMessage(msg.chat.id, menuText, { parse_mode: "Markdown" });
});

// 📌 Handle /help command
bot.onText(/^\/help$/, (msg) => {
    const helpText = `
❓ *Help Section* ❓

✅ Use /calculator to solve math problems. Example:  
   \`/calculator 2^3 + 5\` → *Result: 1
✅ Use /Google to search the web. Example:  
   \`/Google Quantum Mechanics\`  
✅ Use /menu to see available commands.  

Need more help? Just ask! 😊 or contact t.me/Sudais_v1`;

    bot.sendMessage(msg.chat.id, helpText, { parse_mode: "Markdown" });
});

// 📌 Handle /channels command
bot.onText(/^\/channels$/, (msg) => {
    const channelsText = `
🔗 *Recommended Channels* 🔗

📢 [BrainWave Official WhatsApp channel](https://whatsapp.com/channel/0029Vayn2EBFMqrgSUiNMf0F)  
📢 [DEVELOPER](https://wa.me/2349155657641)  
📢 [BOT 🤖](https://t.me/sudais_v1_bot)`;

    bot.sendMessage(msg.chat.id, channelsText, { parse_mode: "Markdown" });
});

// 📌 Universal AI Calculator
bot.onText(/^\/calculator (.+)/, (msg, match) => {
    const chatId = msg.chat.id;
    const query = match[1].trim();

    try {
        let result = math.evaluate(query);
        bot.sendMessage(chatId, `📌 Result:\n *${result}*`, { parse_mode: "Markdown" });
    } catch (error) {
        bot.sendMessage(chatId, "❌ Sorry, I couldn't understand that😑. Try another format.");
    }
});

// 📌 Handle Google Search (basic)
bot.onText(/^\/Google (.+)/, (msg, match) => {
    const query = match[1];
    const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
    bot.sendMessage(msg.chat.id, `🔍 Here are the search results for "${query}":\n${searchUrl}`);
});

// 📌 Handle unknown commands **only if they start with "/" but aren't valid**
bot.on('message', (msg) => {
    if (msg.text.startsWith('/') && !validCommands.some(cmd => msg.text.startsWith(cmd))) {
        bot.sendMessage(msg.chat.id, "⚠️ Unknown command🤨. Type /menu to see available commands.");
    }
});

// Handle errors
bot.on('polling_error', (error) => console.error("⚠️ Polling error:", error));
