import * as functions from 'firebase-functions';
import { Client, TextChannel } from 'discord.js';
import { config } from './config.secrets';

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

export const executeRollCommand = functions.firestore.document('botmessages/{userId}/rolls/{autoId}').onCreate((snap, context) => {
    const bot = new MyDiscordBot();
    const data = snap.data() as RollCommand;
    return snap.ref
        .set(
            {
                triggerState: { intercepted: true }
            },
            { merge: true }
        )
        .then(() => bot.rollSkill(data))
        .then(() =>
            snap.ref.set(
                {
                    triggerState: { completed: true }
                },
                { merge: true }
            )
        )
        .catch(handleError);
});

function handleError(reason: any) {
    console.error(reason);
}

class MyDiscordBot {
    private client: Client;

    // private sendMessage(userId: string, channelId: any, message: string) {
    //     this.enforceClient().then(token => {
    //         const channel = this.client.channels.get(channelId) as TextChannel;
    //         channel.send('<@' + userId + '> ' + message);
    //     });
    // }

    public rollSkill(rollCommand: RollCommand) {
        this.enforceClient().then(() => {
            const channel = this.client.channels.get(rollCommand.discord.channelId) as TextChannel;
            const dicesToRoll = computeDices(rollCommand.dices, rollCommand.additionalDices);
            let rollMsg = `**${rollCommand.characterName}** rolls **${rollCommand.skill}`;
            if (rollCommand.shortAttribute) {
                rollMsg += ` (${rollCommand.shortAttribute})`;
            }
            rollMsg += '**';
            channel.send(`<@${rollCommand.discord.userId}>'s ${rollMsg}:`);
            //channel.send(`!!roll "${rollMsg}" ${dicesToRoll}`);
            channel.send(`!!roll ${dicesToRoll}`);
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
