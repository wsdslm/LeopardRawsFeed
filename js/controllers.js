/**
 * Created by wsdslm <wsdslm@gmail.com> on 2015/2/18.
 */
aniFeed.controller('idxCtrl', function ($scope, Feed) {
    $scope.items = [];
    $scope.showFlag = true;
    Feed.get().then(function (data) {
        $scope.feeds = data.data;
        for (var feed in $scope.feeds) {
            $scope.feeds[feed].show = true;
            Feed.getList($scope.feeds[feed].title).then(function (data) {
                $scope.items = $scope.items.concat(data.data);
            });
        }
    });
    $scope.showTitle = function () {
        $scope.items = [];
        for (var feed in $scope.feeds) {
            if ($scope.feeds[feed].show)
                Feed.getList($scope.feeds[feed].title).then(function (data) {
                    $scope.items = $scope.items.concat(data.data);
                });
        }
    };
    $scope.showAll = function () {
        for (var feed in $scope.feeds) {
            $scope.feeds[feed].show = $scope.showFlag;
        }
        $scope.showTitle();
    }
});

aniFeed.controller('feedCtrl', function ($scope, $location, Feed, Auth) {
    // 是否安全验证
    Auth.isauth().then(function (result) {
        if (result == false) {
            $location.path('/auth');
        }
    });

    $scope.title = '';
    getList();

    function getList() {
        Feed.get().then(function (data) {
            $scope.feeds = data.data;
        });
    }

    $scope.del = function (feed) {
        Feed.del(feed.id).then(function (data) {
            if ('success' == data.data) {
                getList();
            }
        });
    };

    $scope.end = function (feed) {
        Feed.end(feed.id).then(function (data) {
            if ('success' == data.data) {
                getList();
            }
        });
    };

    $scope.add = function () {
        if ($scope.title != '')
            Feed.add($scope.title).then(function (data) {
                if ('success' == data.data) {
                    $scope.title = '';
                    getList();
                }
            });
    }
});

aniFeed.controller('authCtrl', function ($scope, $location, Auth) {
    // 是否安全验证
    Auth.isauth().then(function (result) {
        if (result == true) {
            $location.path('/feed');
        }
    });
    $scope.secret = '';
    $scope.vail = true;
    $scope.auth = function () {
        Auth.auth($scope.secret).then(function (data) {
            if ('success' == data.data) {
                $location.path('/feed');
            } else {
                $scope.vail = false;
                return false;
            }
        });
    }
});