const dotenv = require('dotenv'); 
dotenv.config (); 
const admin = require('firebase-admin');
const serviceAccount = require(process.env.CREDENTIALFIREBASE);

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://coder-b469b.firebaseio.com",
});

module.exports = admin.firestore();