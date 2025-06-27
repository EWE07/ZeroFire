const ZeroEmbed = require("../../structure/Message/embed.js");

module.exports = {
  name: "ping",
  aliases: ["p"],
  run: (client, message) => {
    let a = new ZeroEmbed()
      .setColor(0x0099ff)
      .setTitle("Some title")
      .setAuthor({
        name: "Some name",
        iconURL: "https://i.imgur.com/AfFp7pu.png",
        url: "https://discord.js.org",
      })
      .setDescription("Some description here")
      .setThumbnail({ url: "https://i.imgur.com/AfFp7pu.png" })
      .addFields(
        { name: "Regular field title", value: "Some value here" },
        { name: "\u200B", value: "\u200B" },
        { name: "Inline field title", value: "Some value here", inline: true },
        { name: "Inline field title", value: "Some value here", inline: true }
      )
      .addFields({
        name: "Inline field title",
        value: "Some value here",
        inline: true,
      })
      .setImage({ url: "https://i.imgur.com/AfFp7pu.png" })
      .setTimestamp()
      .setFooter({
        text: "Some footer text here",
        iconURL: "https://i.imgur.com/AfFp7pu.png",
      });

    message.channel.send({ embeds: [a] });
  },
};
