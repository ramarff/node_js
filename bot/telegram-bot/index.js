const TelegramBot = require('node-telegram-bot-api');

// replace the value below with the Telegram token you receive from @BotFather
const token = '1087434938:AAFvVN7zmgb10PH3uAqEKgTPDOupj8-NviY';

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, {polling: true});

const Simsimi = require('simsimi')

var simsimi = Simsimi({
  key: 'PEjhLMzImbLuUMatV47EuWWYlPPfnoW1RkWIpp7z'
})

// Matches "/echo [whatever]"
bot.onText(/\/echo (.+)/, (msg, match) => {
  // 'msg' is the received Message from Telegram
  // 'match' is the result of executing the regexp above on the text content
  // of the message

  const chatId = msg.chat.id;
  const resp = match[1]; // the captured "whatever"

  // send back the matched "whatever" to the chat
  bot.sendMessage(chatId, resp);
});

// Listen for any kind of message. There are different kinds of
// messages.
bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  simsimi(msg.text.toString())
  .then(response => {
    bot.sendMessage(chatId, response);
  })
});