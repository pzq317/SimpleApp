/**
 * Created by pzq317 on 25/09/2017.
 */
var express = require('express');
var router = express.Router();
var path = require('path');
var admin = require('firebase-admin');
var serviceAccount = require("../public/javascripts/friendlychat-23d87-firebase-adminsdk-wiphm-cc8b4197a1.json");
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://friendlychat-23d87.firebaseio.com/"
});

/* GET home page. */

router.get('/', function(req, res, next) {
    res.sendFile(path.join(__dirname,'../public/html/homepage.html'))
});
router.get('/sort', function(req, res, next) {
    res.sendFile(path.join(__dirname,'../public/html/sort.html'))
});
router.get('/menu', function(req, res, next) {
    res.sendFile(path.join(__dirname,'../public/html/example-horizontal-scrolling.html'))
});
router.get('/signup', function(req, res, next) {
    res.sendFile(path.join(__dirname,'../public/html/signup.html'))
});
router.get('/popup', function(req, res, next) {
    res.sendFile(path.join(__dirname, '../public/html/popup.html'));
});
router.get('/index', function (req, res, next) {
    //console.log("here")
    res.sendFile(path.join(__dirname, '../public/html/index.html'));
});
/*router.get('/menu', function (req,res,next){
    res.sendFile(path.join(__dirname,'../public/html/auth.html'))
});*/
/*router.post('/endpoint', function (req,res,next){
    var err="";
    console.log("recieved req");
    console.log(req.body);

    admin.auth().createUser({
        email:req.body.email,
        emailVerified: false,
        phoneNumber: "+1"+req.body.tel,
        password: req.body.password,
        displayName: req.body.name,
        photoURL: "https://static.pepy.jp/wp-content/uploads/2017/06/10110204/shutterstock_617307485-480x320.jpg",
        disabled: false
    }).then(function(userRecord) {
            // pass name and uid to front end
            console.log("Successfully created new user:", userRecord.uid);
            res.send({"state":"correct","uid":userRecord.uid,"name":userRecord.displayName,"tel":userRecord.phoneNumber});
        }).catch(function(error) {
            console.log("Error creating new user:", error.message);
            res.send(error.message);
        });

});*/
router.post('/end', function (req,res,next){
    var err="";
    console.log("recieved req");
    admin.auth().createUser({
        email:req.body.email,
        emailVerified: false,
        phoneNumber: "+1"+req.body.tel,
        password: req.body.password,
        displayName: req.body.name,
        photoURL: "https://static.pepy.jp/wp-content/uploads/2017/06/10110204/shutterstock_617307485-480x320.jpg",
        disabled: false
    }).then(function(userRecord) {
        // pass name and uid to front end
        console.log("Successfully created new user:", userRecord.uid);
        res.send({"state":"correct","uid":userRecord.uid,"name":userRecord.displayName});
    }).catch(function(error) {
        console.log("Error creating new user:", error.message);
        res.send(error.message);
    });

});
module.exports = router;