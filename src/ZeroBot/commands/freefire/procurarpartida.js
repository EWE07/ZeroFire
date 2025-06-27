const { db } = require('../../firebase.js');
const { aliases } = require('./jogar.js');

module.exports = {
  name: "procurarpartida",
  aliases: ["procurar", "procurar-solo", "procurar-solo-partida", "pp"],
  run: async (client, message, args) => {
    const userId = message.author.id;
    const username = message.author.username;

    const snapshot = await db.collection('partidas_solo')
      .where('user_id', '==', userId).get();

    if (!snapshot.empty) return message.reply('⚠️ Você já está na fila.');

    await db.collection('partidas_solo').add({
      user_id: userId,
      username,
      timestamp: Date.now()
    });

    message.reply('✅ Você foi adicionado à fila SOLO por 30 minutos.');
  },
};