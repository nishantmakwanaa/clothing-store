// index.js
const express = require('express');
const admin = require('firebase-admin');
const app = express();
const port = 3000;

// Initialize Firebase Admin with service account key
const serviceAccount = require('./firebase-service-account.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://<your-project-id>.firebaseio.com',
});

// Use Firebase Firestore as an example
const db = admin.firestore();

app.get('/', (req, res) => {
    res.send('Hello World from Express and Firebase!');
});

// Example route to get data from Firestore
app.get('/get-user', async (req, res) => {
    try {
        const userRef = db.collection('users').doc('some-user-id');
        const doc = await userRef.get();
        if (!doc.exists) {
            return res.status(404).send('User not found');
        }
        res.send(doc.data());
    } catch (error) {
        console.error('Error fetching user data: ', error);
        res.status(500).send('Error fetching user data');
    }
});

// Start the Express server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
