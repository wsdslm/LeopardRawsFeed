/**
 * Created by wsdslm <wsdslm@gmail.com> on 2015/2/18.
 */
var aniFeed = angular.module('aniFeed', ['ngRoute']);
function routeConfig($routeProvider) {
    $routeProvider.
        when('/', {
            templateUrl: '/tpl/index.html'
        }).
        when('/feed', {
            templateUrl: '/tpl/feed.html'
        }).
        when('/auth', {
            templateUrl: '/tpl/auth.html'
        }).
        otherwise({redirectTo: '/'});
}
aniFeed.config(routeConfig);