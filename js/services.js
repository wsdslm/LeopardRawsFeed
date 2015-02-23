/**
 * Created by wsdslm <wsdslm@gmail.com> on 2015/2/18.
 */
aniFeed.factory('Feed', function ($http, $location) {
    var obj = {};
    obj.get = function () {
        return $http.get('/feed').then(function (result) {
            return result;
        });
    };
    obj.add = function (title) {
        return $http.post('/feed', {title: title}).then(function (result) {
            return result;
        });
    };
    obj.del = function (id) {
        return $http.delete('/feed/' + id).then(function (result) {
            return result;
        })
    };
    obj.end = function (id) {
        return $http.put('/feed/' + id, {end: 1}).then(function (result) {
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

aniFeed.factory('Auth', function ($http) {
    var obj = {};
    obj.auth = function (secret) {
        return $http.post('/auth', {secret: secret}).then(function (result) {
            return result;
        });
    };
    obj.isauth = function () {
        return $http.get('/auth').then(function (result) {
            return result.data == 'success';
        });
    };
    return obj;
});