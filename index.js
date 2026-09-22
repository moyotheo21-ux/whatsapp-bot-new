const express = require('express');
const axios = require('axios');
const app = express();
app.use(express.json());
const TOKEN = process.env.WHATSAPP_TOKEN;
const PHONE_ID = process.env.PHONE_NUMBER_ID;
app.get('/webhook', (req, res) => {
  if (req.query['hub.verify_token'] === process.env.VERIFY_TOKEN) {
    res.send(req.query['hub.challenge']);
  } else {
    res.sendStatus(403);
  }
});
app.post('/webhook', async (req, res) => {
  try {
    const entry = req.body.entry?.[0];
    const changes = entry?.changes?.[0];
    const message = changes?.value?.messages?.[0];
    if (message) {
      const from = message.from;
      const text = message.text?.body?.toLowerCase() || '';
      let reply = '';
      if (text.includes('menu') || text.includes('hi') || text.includes('hello')) {
        reply = `🤖 *WELCOME TO THEO SERVICES*\n\n📂 *GROUP LINKS*\nChat: https://chat.whatsapp.com/YOUR-LINK\n\n💰 *PRICING*\nMD: 50 Pula\nXMD: 100 Pula\n\n📞 *SUPPORT*\n+267 XX XXX\nmoyotheo21@gmail.com\n\nType:\n1 for Group Links\n2 for Pricing\n3 for Support`;
      } else if (text === '1') {
        reply = `📂 *GROUP LINKS*\nhttps://chat.whatsapp.com/YOUR-LINK`;
      } else if (text === '2') {
        reply = `💰 *PRICING*\nMD: 50 Pula\nXMD: 100 Pula`;
      } else if (text === '3') {
        reply = `📞 *SUPPORT*\n+267 XX XXX\nmoyotheo21@gmail.com`;
      } else {
        reply = `Type *MENU* to see options 🙏`;
      }
      await axios.post(`https://graph.facebook.com/v20.0/${PHONE_ID}/messages`, {
        messaging_product: 'whatsapp',
        to: from,
        text: { body: reply }
      }, {
        headers: { Authorization: `Bearer ${TOKEN}` }
      });
    }
    res.sendStatus(200);
  } catch (e) {
    console.log(e.message);
    res.sendStatus(200);
  }
});
app.get('/', (req, res) => res.send('Bot is running'));
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('Bot running'));
