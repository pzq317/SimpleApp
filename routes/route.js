/**
 * Created by pzq317 on 25/09/2017.
 */
var express = require('express');
var router = express.Router();
var path = require('path')



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
module.exports = router;