import * as functions from 'firebase-functions';

import * as admin from 'firebase-admin';
import Message = admin.messaging.Message;

let app = admin.initializeApp({
    credential: admin.credential.applicationDefault(),
});

export const gcm = functions.https.onRequest((request, response) => {
    if ("POST" === request.method) {
        let body = JSON.parse(request.rawBody.toString()) as Message;
        app.messaging().send(body)
            .then((res) => {
                response.send(res);
            })
            .catch((error) => {
                console.log(error);
                response.status(400).send(error)
            });
    } else {
        response.setHeader("Allow", "POST");
        response.status(405).send("Method Not Allowed")
    }
});
