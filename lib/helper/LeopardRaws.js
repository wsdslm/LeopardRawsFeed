/**
 * Created by wsdslm <wsdslm@gmail.com> on 2015/2/9.
 */
var http = require('http'),
    qs = require('querystring'),
    $ = require('cheerio');

var LeopardRaws = {};

LeopardRaws.getList = function (title, cb) {
    var postData = qs.stringify({
        search: title,
        page: 0
    });
    var opts = {
        host: 'leopard-raws.jp',
        path: '/index.php',
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            'Content-Length': postData.length
        }

    };
    var req = http.request(opts, responseHandler);
    req.write(postData);
    req.end();

    function responseHandler(res) {
        var body = [];
        res.setEncoding('utf8');
        res.on('data', function (chunk) {
            body += chunk;
        });

        res.on('end', function () {
            parseHtml(body);
        });
    }

    function parseHtml(body) {
        var list = [];
        var items = $('.bigblock', body).each(function (idx, obj) {
            var title = $('.torrent_name', obj).text();
            var torrent = $('.torrent_name a', obj).attr('href').replace('./', 'http://leopard-raws.jp/');
            var date = getDate($('.info', obj).text());
            var size_node = $('.size', obj);
            $('a', size_node).remove();
            var size = size_node.text().trim();
            list.push({
                title: title,
                torrent: torrent,
                date: date,
                size: size
            });
        });
        cb(null, list);
    }

    function getDate(info) {
        var info_arr = info.split('|');
        return info_arr[0].replace('時間: ', '');
    }
};

module.exports = LeopardRaws;