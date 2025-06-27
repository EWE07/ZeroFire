const { db } = require('../../firebase.js');


const { PermissionFlagsBits } = require('discord.js');
const { HUB_GUILD_ID } = require('../../../../config.json');
const { aliases } = require('../information/ping.js');

module.exports = {
  name: "jogar",
  aliases: ["jogarpartida", "jogar-solo", "jogar-solo-partida", "j"],
  run: async (client, message, args) => {
    const query = args.join(' ').trim();
    if (!query) return message.reply('Use `!jogar 2` ou `!jogar nomeDoJogador`');

    const snapshot = await db.collection('partidas_solo').orderBy('timestamp').get();
    if (snapshot.empty) return message.reply('📭 A fila está vazia.');

    const docs = snapshot.docs;
    let alvo = null;

    if (!isNaN(parseInt(query))) {
      const index = parseInt(query) - 1;
      alvo = docs[index];
    } else {
      alvo = docs.find(doc => doc.data().username.toLowerCase() === query.toLowerCase());
    }

    if (!alvo) return message.reply('❌ Jogador não encontrado na fila.');

    const jogador = alvo.data();
    const convidado = await client.users.fetch(jogador.user_id);
    const convidador = message.author;

    // Buscar o servidor HUB
    const hubGuild = await client.guilds.fetch(HUB_GUILD_ID);
    const convidadorMember = await hubGuild.members.fetch(convidador.id).catch(() => null);
    const convidadoMember = await hubGuild.members.fetch(convidado.id).catch(() => null);

    // Criar canal com apenas quem já está no servidor
    const overwrites = [
      {
        id: hubGuild.roles.everyone,
        deny: [PermissionFlagsBits.ViewChannel],
      },
      {
        id: client.user.id,
        allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.SendMessages],
      },
    ];

    if (convidadorMember) {
      overwrites.push({
        id: convidador.id,
        allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.SendMessages],
      });
    }

    if (convidadoMember) {
      overwrites.push({
        id: convidado.id,
        allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.SendMessages],
      });
    }

    const canal = await hubGuild.channels.create({
      name: `partida-${convidador.username}-${jogador.username}`.toLowerCase().replace(/\s+/g, '-'),
      type: 0,
      permissionOverwrites: overwrites,
    });

    await canal.send(`🎮 ${convidador} e ${convidado}, este é o canal para combinarem a partida!`);

    // Se algum não estiver no servidor, envia convite e salva na memória
    const invite = await hubGuild.invites.create(canal, { maxAge: 3600, maxUses: 1 });

    if (!convidadorMember) {
      client.pendingInvites.set(convidador.id, { channelID: canal.id, guildID: HUB_GUILD_ID });
      await convidador.send(`📩 Você foi convidado para jogar!\nEntre no servidor: ${invite.url}`);
    } else {
      await convidador.send(`💬 Canal criado para combinar partida: https://discord.com/channels/${HUB_GUILD_ID}/${canal.id}`);
    }

    if (!convidadoMember) {
      client.pendingInvites.set(convidado.id, { channelID: canal.id, guildID: HUB_GUILD_ID });
      await convidado.send(`📩 Você foi convidado para jogar por **${convidador.username}**!\nEntre no servidor: ${invite.url}`);
    } else {
      await convidado.send(`💬 Canal criado para combinar partida: https://discord.com/channels/${HUB_GUILD_ID}/${canal.id}`);
    }

    // Remover da fila
    await db.collection('partidas_solo').doc(alvo.id).delete();
    message.reply(`🎯 Convite enviado. Canal criado no servidor de partidas!`);
  },
};
