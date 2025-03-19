const TelegramBot = require('node-telegram-bot-api');
const math = require('mathjs');

// Use an environment variable for security
const token = process.env.BOT_TOKEN || '8016191385:AAEGhu97sHcjePlJ2M166Gf7TZ3GXpISv64';

if (!token || token.startsWith('YOUR_BOT_TOKEN')) {
    console.error("❌ Error: BOT_TOKEN is missing. Set it in Railway.");
    process.exit(1);
}

// Create the bot
const bot = new TelegramBot(token, { polling: true });

console.log("✅ BrainWave 🤓🤓™ is running...");

// /start command
bot.onText(/\/start/, (msg) => {
    bot.sendMessage(msg.chat.id, `👋 Welcome, *${msg.from.first_name}*!  
I'm *BrainWave 🤓🤓™*, your smart assistant.  
Use /menu to see available commands.`, { parse_mode: "Markdown" });
});

// /menu command
bot.onText(/\/menu/, (msg) => {
    const menuText = `
📜 *BrainWave 🤓🤓™ Commands* 📜

🔹 /start - Start the bot  
🔹 /menu - Show this menu  
🔹 /help - Get help  
🔹 /calculator <expression> - Solve math problems  

*More features coming soon! 🚀*`;

    bot.sendMessage(msg.chat.id, menuText, { parse_mode: "Markdown" });
});

// /help command
bot.onText(/\/help/, (msg) => {
    bot.sendMessage(msg.chat.id, "💡 Need help? Use /menu to see available commands. I'm here to assist you!");
});

// /calculator command (safe math evaluation)
bot.onText(/\/calculator (.+)/, (msg, match) => {
    const chatId = msg.chat.id;
    const expression = match[1];

    try {
        const result = math.evaluate(expression);
        bot.sendMessage(chatId, `🧮 *Calculation:* ${expression}  
📊 *Result:* ${result}`, { parse_mode: "Markdown" });
    } catch (error) {
        bot.sendMessage(chatId, "❌ Invalid expression. Please try again.");
    }
});

// Handle messages (ignores commands)
bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    if (msg.text.startsWith('/')) return; // Ignore commands
    bot.sendMessage(chatId, `📩 *You said:* "${msg.text}"`, { parse_mode: "Markdown" });
});

// Handle errors
bot.on('polling_error', (error) => console.error("⚠️ Polling error:", error));
