/**
 * Created by pzq317 on 26/09/2017.
 */
var admin = require('firebase-admin');
//var admin = require("firebase-admin");

var serviceAccount = require("friendlychat-23d87-firebase-adminsdk-wiphm-cc8b4197a1.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://friendlychat-23d87.firebaseio.com/"
});

admin.auth().createUser({
    email: "user@example.com",
    emailVerified: false,
    phoneNumber: "+11234567890",
    password: "secretPassword",
    displayName: "John Doe",
    photoURL: "http://www.example.com/12345678/photo.png",
    disabled: false
})
    .then(function(userRecord) {
        // See the UserRecord reference doc for the contents of userRecord.
        console.log("Successfully created new user:", userRecord.uid);
    })
    .catch(function(error) {
        console.log("Error creating new user:", error);
    });