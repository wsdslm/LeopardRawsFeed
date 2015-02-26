/**
 * Created by wsdslm <wsdslm@gmail.com> on 2015/2/18.
 */
aniFeed.factory('Feed', function ($http, $cacheFactory) {
    var obj = {};
    var cache = $cacheFactory('feed');
    obj.get = function () {
        return $http.get('/feed', {cache: cache}).then(function (result) {
            return result;
        });
    };
    obj.add = function (title) {
        return $http.post('/feed', {title: title}).then(function (result) {
            if ('success' == result.data)
                cache.removeAll();
            return result;
        });
    };
    obj.del = function (id) {
        return $http.delete('/feed/' + id).then(function (result) {
            if ('success' == result.data)
                cache.removeAll();
            return result;
        })
    };
    obj.end = function (id) {
        return $http.put('/feed/' + id, {end: 1}).then(function (result) {
            if ('success' == result.data)
                cache.removeAll();
            return result;
        });
    };
    obj.getList = function (title) {
        return $http.get('/feed/' + title, {cache: true}).then(function (result) {
            return result;
        });
    };
    return obj;
});

aniFeed.factory('Auth', function ($http, $cacheFactory) {
    var obj = {};
    var cache = $cacheFactory('auth');
    obj.auth = function (secret) {
        return $http.post('/auth', {secret: secret}).then(function (result) {
            cache.removeAll();
            return result;
        });
    };
    obj.isauth = function () {
        return $http.get('/auth', {cache: cache}).then(function (result) {
            return result.data == 'success';
        });
    };
    return obj;
});