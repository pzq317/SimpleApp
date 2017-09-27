/**
 * Created by pzq317 on 21/09/2017.
 */
var express = require('express');
var router = express.Router();



/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});
router.get('/user', function(req, res, next) {
    res.send('respond with a resource');
});
router.get('/index', function (req, res, next) {

    res.send("ddddd");
});
module.exports = router;
