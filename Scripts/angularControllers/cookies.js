angular.module('belugabrain.ctc', ['ui.bootstrap']);
angular.module('belugabrain.ctc').controller('CookiesCtrl', ['$scope', '$http', function ($scope, $window) {
    var cookieConsent = getCookie("cookieConsent");
    $scope.cookieConsentHidden = cookieConsent != "";
    $scope.isCollapsed = true;
    $scope.accept = function () {
        document.cookie = "cookieConsent = true";
        $scope.cookieConsentHidden = true;
    }
    $scope.reject = function () {
        document.cookie = "cookieConsent = false";
        $scope.cookieConsentHidden = true;
    }
    function getCookie(cname) {
        var name = cname + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') c = c.substring(1);
            if (c.indexOf(name) != -1) return c.substring(name.length, c.length);
        }
        return "";
    }
}]);