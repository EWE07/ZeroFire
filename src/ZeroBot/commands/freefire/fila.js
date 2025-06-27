const { db } = require('../../firebase.js');
const { aliases } = require('./jogar.js');

function tempoRestante(timestamp) {
  const expiracao = timestamp + 30 * 60 * 1000;
  const restante = expiracao - Date.now();
  if (restante <= 0) return null;
  const minutos = Math.floor(restante / 60000);
  const segundos = Math.floor((restante % 60000) / 1000);
  return `${minutos}m ${segundos}s`;
}

module.exports = {
  name: "fila",
  aliases: ["filasolo", "fila-solo", "fila-partida-solo", "lista", "f", "l"],
  run: async (client, message, args) => {
    const snapshot = await db.collection('partidas_solo')
      .orderBy('timestamp').get();

    if (snapshot.empty) return message.reply('📭 A fila está vazia.');

    let resposta = '🎮 **Fila Solo:**\n\n';

    for (const doc of snapshot.docs) {
      const data = doc.data();
      const tempo = tempoRestante(data.timestamp);
      if (!tempo) {
        await db.collection('partidas_solo').doc(doc.id).delete();
        continue;
      }
      resposta += `• ${data.username} - expira em ${tempo}\n`;
    }

    message.reply(resposta || '📭 A fila está vazia.');
  },
};
