/**
 * Created by wsdslm <wsdslm@gmail.com> on 2015/2/18.
 */
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('res/db.db');

var Feed = {};

Feed.getList = function (cb) {
    var sql = 'SELECT * FROM feed WHERE end=0';
    db.all(sql, function (err, data) {
        cb(err, data);
    });
};

Feed.add = function (title, cb) {
    if (undefined === title || '' === title.trim()) {
        cb(true);
    } else {
        var sql = 'INSERT INTO feed(title,add_time) VALUES(?,?)';
        db.run(sql, [title, new Date().getTime()], function (err) {
            cb(err, this);
        });
    }
};

Feed.del = function (id, cb) {
    if (undefined !== id && parseInt(id) !== NaN) {
        var sql = 'DELETE FROM feed WHERE id=?';
        db.run(sql, [id], function (err) {
            cb(err, this);
        });
    } else {
        cb(true);
    }
};

Feed.end = function (id, cb) {
    if (undefined !== id && parseInt(id) !== NaN) {
        var sql = 'UPDATE feed SET end=1 WHERE id=?';
        db.run(sql, [id], function (err) {
            cb(err, this);
        });
    } else {
        cb(true);
    }
};

module.exports = Feed;