const { ZeroClient, GatewayIntentBits } = require("./structure/Client");
const client = new ZeroClient({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
  ],
});

client.pendingInvites = new Map();

client.login();
client.LoadCommands();
client.LoadEvents();
