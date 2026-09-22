const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const app = express();
app.use(bodyParser.json());

const PHONE_NUMBER_ID = process.env.PHONE_NUMBER_ID;
const ACCESS_TOKEN = process.env.ACCESS_TOKEN;
const VERIFY_TOKEN = process.env.VERIFY_TOKEN || "theo123";
const SUPPORT = "+267 777 63889";

app.get('/webhook', (req, res) => {
  if (req.query['hub.verify_token'] === VERIFY_TOKEN) res.send(req.query['hub.challenge']);
    else res.sendStatus(403);
    });

    app.post('/webhook', async (req, res) => {
      try {
          const msg = req.body.entry?.[0]?.changes?.[0]?.value?.messages?.[0];
              if (!msg) return res.sendStatus(200);
                  const from = msg.from;
                      const text = (msg.text?.body || "").trim().toLowerCase();
                          let reply = "";

                              if (["menu","hi","hello","start","ok"].includes(text)) {
                                    reply = `🤖 *WELCOME TO THEO SERVICES* 🤖

                                    1️⃣ BOT DEPLOYMENT
                                    24/7 non-stop hosting

                                    2️⃣ BOT TYPES
                                    MD Bot, XMD, Plugins

                                    3️⃣ WHATSAPP SOLUTION
                                    30 Days Guarantee

                                    4️⃣ PTERODACTYL PANELS
                                    2GB | 4GB | 8GB | 16GB | UNLIMITED

                                    5️⃣ FULL PRICING
                                    Complete price list

                                    6️⃣ SUPPORT
                                    Contact Us

                                    Reply with *1-6*
                                    📞 ${SUPPORT}`;
                                        } else if (text === "1") {
                                              reply = `1️⃣ *BOT DEPLOYMENT*\n✅ 24/7 Hosting\n✅ Instant Setup\n✅ Auto Restart\n\nWe keep your bot online always.\n\nType *MENU*\n📞 ${SUPPORT}`;
                                                  } else if (text === "2") {
                                                        reply = `2️⃣ *BOT TYPES*\n\n🔥 THEO-MD: 50 Pula\n🔥 THEO-XMD: 100 Pula\n🔥 Plugins Available\n\nType *MENU*\n📞 ${SUPPORT}`;
                                                            } else if (text === "3") {
                                                                  reply = `3️⃣ *WHATSAPP SOLUTION*\n\n✅ 30 Days Guarantee\n✅ Ban Fix\n✅ Pairing Fix\n✅ 24/7 Support\n\nType *MENU*\n📞 ${SUPPORT}`;
                                                                      } else if (text === "4") {
                                                                            reply = `4️⃣ *PTERODACTYL PANELS*\n\n💾 2GB - 15 Pula\n💾 4GB - 25 Pula\n💾 8GB - 40 Pula\n💾 16GB - 60 Pula\n♾️ UNLIMITED - 100 Pula\n\nType *MENU*\n📞 ${SUPPORT}`;
                                                                                } else if (text === "5") {
                                                                                      reply = `💰 *FULL PRICING*\n\n🤖 BOTS:\nMD Bot 50 Pula\nXMD Bot 100 Pula\n\n💾 PANELS:\n2GB 15 P\n4GB 25 P\n8GB 40 P\n16GB 60 P\nUNLIMITED 100 P\n\n📞 ${SUPPORT}\n\nType *MENU*`;
                                                                                          } else if (text === "6") {
                                                                                                reply = `📞 *SUPPORT*\n\nPhone: ${SUPPORT}\nEmail: moyotheo21@gmail.com\nOnline 24/7\n\nType *MENU*`;
                                                                                                    } else {
                                                                                                          reply = `Send *MENU* and choose 1-6\n📞 ${SUPPORT}`;
                                                                                                              }

                                                                                                                  await axios.post(`https://graph.facebook.com/v20.0/${PHONE_NUMBER_ID}/messages`, {
                                                                                                                        messaging_product: "whatsapp",
                                                                                                                              to: from,
                                                                                                                                    text: { body: reply }
                                                                                                                                        }, { headers: { Authorization: `Bearer ${ACCESS_TOKEN}` } });

                                                                                                                                            res.sendStatus(200);
                                                                                                                                              } catch (e) {
                                                                                                                                                  console.log(e.response?.data || e.message);
                                                                                                                                                      res.sendStatus(200);
                                                                                                                                                        }
                                                                                                                                                        });

                                                                                                                                                        app.get('/', (req,res)=>res.send('Bot running'));
                                                                                                                                                        app.listen(10000, ()=>console.log('Bot running'));