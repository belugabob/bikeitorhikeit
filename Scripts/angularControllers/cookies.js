angular.module('belugabrain.ctc', ['ui.bootstrap']);
angular.module('belugabrain.ctc').service('CookieService', function () {
    this.getCookie = function (cname) {
        var name = cname + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') c = c.substring(1);
            if (c.indexOf(name) != -1) return c.substring(name.length, c.length);
        }
        return "";
    };
    this.deleteAllCookies = function () {
        var cookies = document.cookie.split(";");
        for (var i = 0; i < cookies.length; i++) {
            var spcook = cookies[i].split("=");
            deleteCookie(spcook[0]);
        }
        function deleteCookie(cookiename) {
            var d = new Date();
            d.setDate(d.getDate() - 1);
            var expires = ";expires=" + d;
            var name = cookiename;
            //alert(name);
            var value = "";
            document.cookie = name + "=" + value + expires; // + "; path=/acc/html";
        }
        //window.location = ""; // TO REFRESH THE PAGE
    }
});
angular.module('belugabrain.ctc').controller('CookieConsentCtrl', ['$scope', '$http', 'CookieService', function ($scope, $window, CookieService) {
    var cookieConsent = CookieService.getCookie("cookieConsent");
    $scope.cookieConsentHidden = cookieConsent != "";
    $scope.isCollapsed = true;
    $scope.accept = function () {
        document.cookie = "cookieConsent = true";
        $scope.cookieConsentHidden = true;
    }
    $scope.reject = function () {
        CookieService.deleteAllCookies();
        document.cookie = "cookieConsent = false";
        $scope.cookieConsentHidden = true;
    }
}]);