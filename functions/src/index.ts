import * as functions from 'firebase-functions';
import { config } from './config.secrets';
import { Client, Message, TextChannel } from 'discord.js';

export const executeRollCommand = functions.firestore.document('botmessages/{userId}/rolls/{autoId}').onCreate((snap, context) => {
    const data = snap.data() as RollCommand;
    return bot
        .rollSkill(data)
        .then(() => {
            snap.ref.delete(); // TODO: check for 200 OK before deleting
            console.log('Roll command executed.', data);
        })
        .catch(reason => {
            console.error(reason, data);
        });
});

interface RollCommand {
    createdAt: Date;
    discord: DiscordChannelInfo;
    characterName: string;
    skill: string;
    shortAttribute: string;
    dices: string;
    additionalDices: string;
    dicesToRoll: string;
    botCommand: string;
    userInfo: UserInfo;
}

interface DiscordChannelInfo {
    userId: string;
    channelId: string;
}

interface UserInfo {
    displayName: string;
    email: string;
    uid: string;
}

class MyDiscordBot {
    private client!: Client;
    public rollSkill(rollCommand: RollCommand): Promise<Message | Message[]> {
        return this.enforceClient().then(() => {
            const channel = this.client.channels.get(rollCommand.discord.channelId) as TextChannel;
            const dicesToRoll = computeDices(rollCommand.dices, rollCommand.additionalDices);
            let rollMsg = `**${rollCommand.characterName}** (${rollCommand.userInfo.displayName}) rolls **${rollCommand.skill}`;
            if (rollCommand.shortAttribute) {
                rollMsg += ` (${rollCommand.shortAttribute})`;
            }
            rollMsg += '**';
            return channel.send(`!!roll ${dicesToRoll} "${rollMsg}"`);
        });
    }
    private enforceClient(): Promise<string> {
        if (this.client) return Promise.resolve('');
        this.client = new Client();
        return this.client.login(config.auth.token);
    }
}

function computeDices(dices: any, additionalDices: any) {
    let result = dices;
    for (const key in additionalDices) {
        if (additionalDices.hasOwnProperty(key)) {
            const amount = additionalDices[key];
            result += key.repeat(amount);
        }
    }
    return result;
}

const bot = new MyDiscordBot();
