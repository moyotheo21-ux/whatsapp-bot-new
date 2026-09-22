require('dotenv').config();
const express = require('express');
const axios = require('axios');
const app = express();
app.use(express.json());

const TOKEN = process.env.WHATSAPP_TOKEN;
const PHONE_ID = process.env.PHONE_NUMBER_ID;
const VERIFY = process.env.VERIFY_TOKEN || 'theo123';

app.get('/webhook', (req, res) => {
  if (req.query['hub.verify_token'] === VERIFY) {
    console.log('VERIFIED!');
    return res.send(req.query['hub.challenge']);
  }
  res.sendStatus(403);
});

app.post('/webhook', async (req, res) => {
  try {
    const msg = req.body.entry?.[0]?.changes?.[0]?.value?.messages?.[0];
    if (!msg) return res.sendStatus(200);
    const from = msg.from;
    const text = msg.text?.body?.toLowerCase() || '';
    console.log('From', from, ':', text);
    let reply = 'Hi! Send MENU for options.';
    if (text.includes('menu') || text.includes('hi') || text.includes('hello')) {
      reply = `Welcome! 👋\n1. Shop\n2. Support\nReply with number`;
    }
    await axios.post(`https://graph.facebook.com/v20.0/${PHONE_ID}/messages`, {
      messaging_product: 'whatsapp',
      to: from,
      text: { body: reply }
    }, {
      headers: { Authorization: `Bearer ${TOKEN}` }
    });
    console.log('Replied to', from);
  } catch (e) {
    console.log('Error:', e.response?.data || e.message);
  }
  res.sendStatus(200);
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log('Bot running on port', PORT));
