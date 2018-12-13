import firebase from '@firebase/app';

class MyDiscordBot {
    user = null;
    rollSkill = function(userId, channelId, characterName, skill, shortAttribute, dices, additionalDices) {
        this.enforceCurrentUser().then(() => {
            const dicesToRoll = computeDices(dices, additionalDices);
            const createdAt = new Date().toUTCString();
            const db = firebase.firestore();
            const botCommand = `!!roll ${dicesToRoll}`;
            db.collection(`botmessages/${this.user.uid}/rolls`)
                .doc()
                .set({
                    createdAt,
                    discord: {
                        userId,
                        channelId,
                    },
                    characterName,
                    skill,
                    shortAttribute,
                    dices,
                    additionalDices,
                    dicesToRoll,
                    botCommand,
                    userInfo: {
                        displayName: this.user.displayName,
                        email: this.user.email,
                        uid: this.user.uid,
                    }
                })
                .then(function() {
                    console.log(`Bot command sent.`);
                })
                .catch(function(error) {
                    console.error(`Error setting bot command: `, error);
                    alert(`An error occured while sending the bot command.`);
                });
        });
    };
    enforceCurrentUser = function() {
        if (this.user == null){
            this.user = firebase.auth().currentUser;
        }
        if (this.user) {
            return Promise.resolve();
        }
        return Promise.reject("User not authneticated.");
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
