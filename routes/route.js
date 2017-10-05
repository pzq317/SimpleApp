/**
 * Created by pzq317 on 25/09/2017.
 */
var express = require('express');
var router = express.Router();
var path = require('path')
var admin = require('firebase-admin');
var serviceAccount = require("../public/javascripts/friendlychat-23d87-firebase-adminsdk-wiphm-cc8b4197a1.json");
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://friendlychat-23d87.firebaseio.com/"
});

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});
router.get('/user', function(req, res, next) {
    res.send('respond with a resource');
});
router.get('/index', function (req, res, next) {
    //console.log("here")
    res.sendFile(path.join(__dirname, '../public/html/index.html'));
});
router.get('/menu', function (req,res,next){
    res.sendFile(path.join(__dirname,'../public/html/auth.html'))
});
router.post('/endpoint', function (req,res,next){
    var err="";
    console.log("recieved req");
    console.log(req.body);

    admin.auth().createUser({
        email:req.body.email,
        emailVerified: false,
        phoneNumber: "+1"+req.body.tel,
        password: req.body.password,
        displayName: req.body.name,
        disabled: false
    }).then(function(userRecord) {
            // See the UserRecord reference doc for the contents of userRecord.
            console.log("Successfully created new user:", userRecord.uid);
            res.send("correct user");
        }).catch(function(error) {
            console.log("Error creating new user:", error.message);
            res.send(error.message);
        });


    //res.end();
    /*admin.auth().createUser({
        email: req.body.email,
        emailVerified: false,
        phoneNumber: req.body.tel,
        password: req.body.password,
        displayName: req.body.name,
        //photoURL: "http://www.example.com/12345678/photo.png",
        disabled: false
    })
        .then(function(userRecord) {
            // See the UserRecord reference doc for the contents of userRecord.
            console.log("Successfully created new user:", userRecord.uid);
        })
        .catch(function(error) {
            console.log("Error creating new user:", error);
        });*/

});
module.exports = router;