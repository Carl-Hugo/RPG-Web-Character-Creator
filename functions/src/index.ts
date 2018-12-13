import * as functions from 'firebase-functions';

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

export const executeRollCommand = functions.firestore.document('botmessages/{userId}/rolls/{autoId}').onCreate((snap, context) => {
    snap.ref.set(
        {
            intercepted: true
        },
        { merge: true }
    );
});
