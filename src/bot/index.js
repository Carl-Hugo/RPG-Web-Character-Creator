import { Client } from 'discord.js';
import { config } from './config.secrets';

class MyDiscordBot {
    client = null;
    sendMessage = function(userId, channelId, message) {
        this.enforceClient().then(s => {
            const channel = this.client.channels.get(channelId);
            channel.send('<@' + userId + '> ' + message);
        });
    };
    rollSkill = function(userId, channelId, skill, shortAttribute, dices) {
        this.enforceClient().then(s => {
            const channel = this.client.channels.get(channelId);
            channel.send(`<@${userId}> rolls **${skill} (${shortAttribute})**:`);
            channel.send(dices);
        });
    };
    enforceClient = function() {
        if (this.client) return;
        this.client = new Client();
        console.log(config);
        return this.client.login(config.auth.token);
    };
}

export const bot = new MyDiscordBot();
