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
    rollSkill = function(userId, channelId, characterName, skill, shortAttribute, dices, additionalDices) {
        this.enforceClient().then(() => {
            const channel = this.client.channels.get(channelId);
            const dicesToRoll = computeDices(dices, additionalDices);
            channel.send(`<@${userId}>'s **${characterName}** rolls **${skill} (${shortAttribute})**:`);
            channel.send(`!!roll "**${characterName}** rolls **${skill} (${shortAttribute})**" ${dicesToRoll}`);
        });
    };
    enforceClient = function() {
        if (this.client) return Promise.resolve();
        this.client = new Client();
        return this.client.login(config.auth.token);
    };
}

function computeDices(dices, additionalDices) {
    let result = dices;
    for (const key in additionalDices) {
        if (additionalDices.hasOwnProperty(key)) {
            const amount = additionalDices[key];
            result += key.repeat(amount);
        }
    }
    return result;
}

export const bot = new MyDiscordBot();
