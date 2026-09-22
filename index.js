const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const app = express();
app.use(bodyParser.json());

const PHONE_NUMBER_ID = process.env.PHONE_NUMBER_ID;
const ACCESS_TOKEN = process.env.ACCESS_TOKEN;
const VERIFY_TOKEN = process.env.VERIFY_TOKEN || "theo123";

const SUPPORT_NUMBER = "+267 777 63889";
const SUPPORT_EMAIL = "moyotheo21@gmail.com";
const GROUP_LINK = "https://chat.whatsapp.com/YOUR-ACTUAL-LINK-HERE";

app.get('/webhook', (req, res) => {
  if (req.query['hub.verify_token'] === VERIFY_TOKEN) {
      res.send(req.query['hub.challenge']);
        } else {
            res.sendStatus(403);
              }
              });

              app.post('/webhook', async (req, res) => {
                try {
                    const entry = req.body.entry?.[0];
                        const changes = entry?.changes?.[0];
                            const value = changes?.value;
                                const message = value?.messages?.[0];

                                    if (!message) return res.sendStatus(200);

                                        const from = message.from;
                                            const text = message.text?.body?.trim().toLowerCase() || "";
                                                let reply = "";

                                                    if (text === "menu" || text === "hi" || text === "hello") {
                                                          reply = `🤖 *WELCOME TO THEO SERVICES*

                                                          1️⃣ *BOT DEPLOYMENT*
                                                             We deploy your bot 24/7

                                                             2️⃣ *BOT TYPES*
                                                                MD, XMD, Plugins available
                                                                   🔗 Group: ${GROUP_LINK}

                                                                   3️⃣ *WHATSAPP SOLUTION*
                                                                      ✅ 30 Days Guarantee
                                                                         ✅ Fast Support

                                                                         4️⃣ *PTERODACTYL PANELS*
                                                                            💾 2GB, 4GB, 8GB, 16GB
                                                                               ♾️ UNLIMITED Plans
                                                                                  From 15 Pula/month

                                                                                  5️⃣ *FULL PRICING*
                                                                                     💰 MD: 50 Pula
                                                                                        💰 XMD: 100 Pula
                                                                                           💾 Panels from 15 Pula

                                                                                           6️⃣ *SUPPORT*
                                                                                              📞 ${SUPPORT_NUMBER}
                                                                                                 📧 ${SUPPORT_EMAIL}

                                                                                                 Type *1-6* to choose 🙏`;
                                                                                                     } else if (text === "1") {
                                                                                                           reply = `1️⃣ *BOT DEPLOYMENT*\n\nWe host your bot 24/7 non-stop!\n✅ No disconnections\n✅ Instant deploy\n✅ Cheap\n\nType *MENU* to go back\n📞 ${SUPPORT_NUMBER}`;
                                                                                                               } else if (text === "2") {
                                                                                                                     reply = `2️⃣ *BOT TYPES*\n\n🔥 MD Bot\n🔥 XMD Bot\n🔥 Custom Plugins\n\nJoin our group:\n${GROUP_LINK}\n\nType *MENU* to go back`;
                                                                                                                         } else if (text === "3") {
                                                                                                                               reply = `3️⃣ *WHATSAPP SOLUTION*\n\n✅ 30 Days Guarantee\n✅ We fix all errors\n✅ Ban support\n✅ Fast response\n\nType *MENU* to go back`;
                                                                                                                                   } else if (text === "4") {
                                                                                                                                         reply = `4️⃣ *PTERODACTYL PANELS*\n\n💾 2GB - 15 Pula\n💾 4GB - 25 Pula\n💾 8GB - 40 Pula\n💾 16GB - 60 Pula\n♾️ UNLIMITED - 100 Pula\n\nType *MENU* to go back`;
                                                                                                                                             } else if (text === "5") {
                                                                                                                                                   reply = `💰 *FULL PRICING*\n\n🤖 MD Bot: 50 Pula\n🤖 XMD Bot: 100 Pula\n💾 Panel 2GB: 15 Pula\n💾 Panel UNLIMITED: 100 Pula\n\n📞 ${SUPPORT_NUMBER}\n\nType *MENU* to go back`;
                                                                                                                                                       } else if (text === "6") {
                                                                                                                                                             reply = `📞 *SUPPORT*\n\nPhone: ${SUPPORT_NUMBER}\nEmail: ${SUPPORT_EMAIL}\nGroup: ${GROUP_LINK}\n\nWe are online 24/7 🙏\n\nType *MENU* to go back`;
                                                                                                                                                                 } else {
                                                                                                                                                                       reply = `Send *MENU* - Choose 1-6 🙏\n📞 ${SUPPORT_NUMBER}`;
                                                                                                                                                                           }

                                                                                                                                                                               await axios({
                                                                                                                                                                                     method: "POST",
                                                                                                                                                                                           url: `https://graph.facebook.com/v20.0/${PHONE_NUMBER_ID}/messages`,
                                                                                                                                                                                                 headers: { Authorization: `Bearer ${ACCESS_TOKEN}` },
                                                                                                                                                                                                       data: {
                                                                                                                                                                                                               messaging_product: "whatsapp",
                                                                                                                                                                                                                       to: from,
                                                                                                                                                                                                                               text: { body: reply }
                                                                                                                                                                                                                                     }
                                                                                                                                                                                                                                         });

                                                                                                                                                                                                                                             res.sendStatus(200);
                                                                                                                                                                                                                                               } catch (e) {
                                                                                                                                                                                                                                                   console.log(e.response?.data || e.message);
                                                                                                                                                                                                                                                       res.sendStatus(200);
                                                                                                                                                                                                                                                         }
                                                                                                                                                                                                                                                         });

                                                                                                                                                                                                                                                         app.get('/', (req,res) => res.send('Bot is running'));
                                                                                                                                                                                                                                                         app.listen(10000, () => console.log('Bot running on 10000'));