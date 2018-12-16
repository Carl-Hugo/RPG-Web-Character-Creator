import * as functions from 'firebase-functions';
import { config } from './config.secrets';
import * as request from 'request-promise';

export const executeRollCommand = functions.firestore.document('botmessages/{userId}/rolls/{autoId}').onCreate((snap, context) => {
    const data = snap.data() as RollCommand;
    const uri = `https://${config.azure.host}/api/QueueARoll?code=${config.azure.key}`;

    const options = {
        uri,
        method: 'POST',
        body: data,
        json: true
    };
    return request(options)
        .then(() => {
            snap.ref.delete(); // TODO: check for 200 OK before deleting
            console.log('HTTP Request sent!', data);
        })
        .catch(reason => {
            console.error(reason);
            console.log('options', options);
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
