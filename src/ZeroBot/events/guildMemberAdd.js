const { Events } = require("../structure/Client");


module.exports = {
  name: Events.GuildMemberAdd,
  once: true,
  execute: async (client, member) => {
      const pending = client.pendingInvites.get(member.id);
  if (!pending || member.guild.id !== pending.guildID) return;

  const channel = await member.guild.channels.fetch(pending.channelID).catch(() => null);
  if (!channel) return;

  await channel.permissionOverwrites.edit(member.id, {
    ViewChannel: true,
    SendMessages: true,
  });

  await channel.send(`✅ ${member.user.username} entrou no servidor e agora tem acesso ao canal.`);

  client.pendingInvites.delete(member.id); 
}
}