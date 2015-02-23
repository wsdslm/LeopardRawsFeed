var express = require('express'),
    Feed = require('../lib/helper/feed'),
    LR = require('../lib/helper/LeopardRaws');
var router = express.Router();

router.all('/*', function (req, res, next) {
    if (req.method.toLowerCase() != 'get' && true != req.session.auth) {
        res.end('auth fail');
    } else {
        next();
    }
});

router.get('/', function (req, res) {
    Feed.getList(function (err, data) {
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.end(JSON.stringify(data));
    });
});

router.get('/:title', function (req, res) {
    LR.getList(req.params.title, function (err, data) {
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.end(JSON.stringify(data));
    })
});

router.post('/', function (req, res) {
    Feed.add(req.body.title, function (err) {
        res.end(err ? 'fail' : 'success');
    });
});

router.put('/:id', function (req, res) {
    Feed.end(req.params.id, function (err) {
        res.end(err ? 'fail' : 'success');
    });
});

router.delete('/:id', function (req, res) {
    Feed.del(req.params.id, function (err) {
        res.end(err ? 'fail' : 'success');
    });
});

module.exports = router;
