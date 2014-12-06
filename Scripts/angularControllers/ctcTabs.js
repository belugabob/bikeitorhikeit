angular.module('belugabrain.ctc', ['ui.bootstrap']);
angular.module('belugabrain.ctc').controller('CtcTabsCtrl', ['$scope', '$http', function ($scope, $window) {
    $scope.tabs = [
      { title: 'Dynamic Title 1', content: 'Dynamic content 1' },
      { title: 'Dynamic Title 2', content: 'Dynamic content 2', disabled: true }
    ];

    $scope.alertMe = function () {
        setTimeout(function () {
            $window.alert('You\'ve selected the alert tab!');
        });
    };

    $scope.initMap = function () {
        if ($scope.map == null) {
            initialize();
        }
    };

    function initialize() {

        var ocmMapType = new google.maps.ImageMapType({
            getTileUrl: function (coord, zoom) {
                return "http://tile.thunderforest.com/cycle/" + zoom + "/" + coord.x + "/" + coord.y + ".png";
            },
            tileSize: new google.maps.Size(256, 256),
            name: "OpenCycleMap",
            maxZoom: 18
        });

        var mapTypeIds = [];
        for (var type in google.maps.MapTypeId) {
            mapTypeIds.push(google.maps.MapTypeId[type]);
        }

        mapTypeIds.push("OCM");

        $scope.map = new google.maps.Map(
            document.getElementById('map-canvas'),
            {
                center: new google.maps.LatLng(54.8, -1.8),
                zoom: 6,
                mapTypeControlOptions: {
                    mapTypeIds: mapTypeIds,
                    position: google.maps.ControlPosition.TOP_RIGHT
                }
            }
        );

        var map = $scope.map;

        map.mapTypes.set("OCM", ocmMapType);

        setMarkers(map, towns);
        setTownLinks(map, towns, links);

        google.maps.event.trigger(map, 'resize');
    }

    var countries = [
        [1, "England"],
        [2, "Wales"],
        [3, "Scotland"],
        [4, "Northern Ireland"]
    ]
    /**
     * Data for the markers consisting of a name, a LatLng and a zIndex for
     * the order in which these markers should display on top of each
     * other.
     */
    var towns = [
        ["Chichester", 50.832086, -0.781243, 1, 1],
        ["Newport", 50.700467, -1.290579, 1, 1],
        ["Winchester", 51.067097, -1.319593, 1, 1],
        ["Dorchester", 50.709254, -2.437557, 1, 1],
        ["Exeter", 50.729389, -3.543011, 1, 1],
        ["Truro", 50.263764, -5.064836, 1, 1],
        ["Taunton", 51.023677, -3.103583, 1, 1],
        ["Trowbridge", 51.319753, -2.214404, 1, 1],
        ["Bristol", 51.449146, -2.581558, 1, 1],
        ["Gloucester", 51.865356, -2.238828, 1, 1],
        ["Reading", 51.457994, -0.971695, 1, 1],
        ["Guildford", 51.236896, -0.580124, 1, 1],
        ["Maidstone", 51.277623, 0.521304, 1, 1],
        ["Lewes", 50.870620, 0.011106, 1, 1],
        ["London", 51.505100, -0.086869, 1, 1],
        ["Chelmsford", 51.736216, 0.468596, 1, 1],
        ["Hertford", 51.799000, -0.091610, 1, 1],
        ["Aylesbury", 51.814039, -0.815302, 1, 1],
        ["Oxford", 51.753461, -1.269647, 1, 1],
        ["Hereford", 52.061206, -2.708964, 1, 1],
        ["Worcester", 52.194532, -2.209502, 1, 1],
        ["Warwick", 52.286423, -1.582049, 1, 1],
        ["Northampton", 52.237258, -0.906592, 1, 1],
        ["Bedford", 52.136529, -0.479333, 1, 1],
        ["Cambridge", 52.194320, 0.136942, 1, 1],
        ["Ipswich", 52.050622, 1.145028, 1, 1],
        ["Norwich", 52.627165, 1.306535, 1, 1],
        ["Oakham", 52.671843, -0.734130, 1, 1],
        ["Leicester", 52.630736, -1.125003, 1, 1],
        ["Birmingham", 52.477390, -1.896747, 1, 1],
        ["Shrewsbury", 52.711651, -2.749810, 1, 1],
        ["Stafford", 52.803812, -2.121588, 1, 1],
        ["Derby", 52.916147, -1.463578, 1, 1],
        ["Nottingham", 52.947054, -1.147241, 1, 1],
        ["Lincoln", 53.226626, -0.539618, 1, 1],
        ["Sheffield", 53.378441, -1.463556, 1, 1],
        ["Chester", 53.196432, -2.880418, 1, 1],
        ["Liverpool", 53.406958, -2.978603, 1, 1],
        ["Manchester", 53.476385, -2.230383, 1, 1],
        ["Wakefield", 53.682698, -1.504520, 1, 1],
        ["Beverley", 53.842356, -0.423400, 1, 1],
        ["Northallerton", 54.332782, -1.440675, 1, 1],
        ["Lancaster", 54.048647, -2.808401, 1, 1],
        ["Carlisle", 54.890932, -2.932214, 1, 1],
        ["Morpeth", 55.162101, -1.682823, 1, 1],
        ["Newcastle", 54.969155, -1.617347, 1, 1],
        ["Durham", 54.779039, -1.581513, 1, 1],
        ["Ebbw Vale (Blaenau Gwent)", 51.757142, -3.196846, 1, 2],
        ["Bridgend (Bridgend)", 51.507086, -3.575664, 1, 2],
        ["Caerphilly (Caerphilly)", 51.571858, -3.218875, 1, 2],
        ["Cardiff (Cardiff)", 51.476206, -3.179565, 1, 2],
        ["Carmarthen (Carmarthenshire)", 51.853566, -4.305794, 1, 2],
        ["Aberaeron (Ceredigion)", 52.239754, -4.265315, 1, 2],
        ["Conwy (Conwy)", 53.280140, -3.829918, 1, 2],
        ["Ruthin (Denbighshire)", 53.114950, -3.309169, 1, 2],
        ["Mold (Flintshire)", 53.167444, -3.143304, 1, 2],
        ["Caernarfon (Gwynedd)", 53.140333, -4.276784, 1, 2],
        ["Llangefni (Isle of Anglesey)", 53.253365, -4.309810, 1, 2],
        ["Merthyr Tydfil", 51.744561, -3.377066, 1, 2],
        ["Monmouth (Monmouthshire)", 51.812025, -2.715701, 1, 2],
        ["Port Talbot (Neath Port Talbot)", 51.592084, -3.780747, 1, 2],
        ["NewPort (Newport)", 51.588300, -3.000131, 1, 2],
        ["Haverford West (Pembrokeshire)", 51.802549, -4.960836, 1, 2],
        ["Landrindod Wells (Powys)", 52.242081, -3.379012, 1, 2],
        ["Clydach Vale (Rhondda Cynon Taf)", 51.624334, -3.470327, 1, 2],
        ["Swansea (Swansea)", 51.625795, -3.941318, 1, 2],
        ["Pontypool (Torfaen)", 51.696869, -3.013803, 1, 2],
        ["Barry (Vale of Glamorgan)", 51.392141, -3.273904, 1, 2],
        ["Wrexham", 53.049887, -3.001323, 1, 2],
        ["Aberdeen (AberdeenShire)", 57.144356, -2.099309, 1, 3],
        ["Forfar (Angus)", 56.635020, -2.921564, 1, 3],
        ["Lochgilphead (Argyle and Bute)", 56.026213, -5.422444, 1, 3],
        ["Edinburgh", 55.951072, -3.191453, 1, 3],
        ["Alloa (Clackmannanshire)", 56.117793, -3.789445, 1, 3],
        ["Stronoway (Western Isles)", 58.208606, -6.379321, 1, 3],
        ["Dumfries (Dumfries and Galloway", 55.072156, -3.604727, 1, 3],
        ["Dundee", 56.457543, -2.969381, 1, 3],
        ["Kilmarnock (East Ayrshire)", 55.611953, -4.498405, 1, 3],
        ["Kirkintilloch (East Dunbartonshire)", 55.934619, -4.159395, 1, 3],
        ["Haddington (East Lothian)", 55.954510, -2.781348, 1, 3],
        ["Giffnock (East Renfreshire)", 55.804016, -4.293281, 1, 3],
        ["Falkirk", 56.002749, -3.784910, 1, 3],
        ["Glenrothes (Fife)", 56.197683, -3.176695, 1, 3],
        ["Glasgow", 55.860553, -4.257785, 1, 3],
        ["Inverness (Highlands)", 57.479750, -4.222448, 1, 3],
        ["Greenock (Invercylde", 55.945952, -4.752774, 1, 3],
        ["Dalkeith (Midlothian", 55.892602, -3.070403, 1, 3],
        ["Elgin (Moray)", 57.643019, -3.311340, 1, 3],
        //["", , 1, 3],
        //["", , 1, 3],
        //["", , 1, 3],
        //["", , 1, 3],
        //["", , 1, 3],
        //["", , 1, 3],
        //["", , 1, 3],
        //["", , 1, 3],
        //["", , 1, 3],
        //["", , 1, 3],
        //["", , 1, 3]
    ];

    var links = [
        [1, [2, 3, 12, 14]],
        [2, [3, 4]],
        [3, [4, 8, 11, 12]],
        [4, [5, 7, 8]],
        [5, [6, 7]],
        [6, [7]],
        [7, [8, 9]],
        [8, [9, 10, 11, 19]],
        [9, [10, 20, 60, 62]],
        [10, [19, 20, 21, 22]],
        [11, [12, 15, 18, 19]],
        [12, [13, 14, 15]],
        [13, [14, 15, 16]],
        [15, [16, 17, 18]],
        [16, [17, 25, 26]],
        [17, [18, 24, 25]],
        [18, [19, 23, 24]],
        [19, [22, 23]],
        [20, [21, 31, 48, 60, 67]],
        [21, [22, 30, 31]],
        [22, [23, 29, 30]],
        [23, [24, 28, 29]],
        [24, [25, 28]],
        [25, [26, 27, 28]],
        [26, [27]],
        [27, [28, 35]],
        [28, [29, 34, 35]],
        [29, [30, 33, 34]],
        [30, [31, 32, 33]],
        [31, [32, 37]],
        [32, [33, 37]],
        [33, [34, 36, 37]],
        [34, [35, 36]],
        [35, [36, 41]],
        [36, [37, 39, 40, 41]],
        [37, [38, 39]],
        [38, [39, 43]],
        [39, [40, 42, 43]],
        [40, [41, 42]],
        [41, [42]],
        [42, [43, 47]],
        [43, [44, 47]],
        [44, [45, 46, 47]],
        [45, [46]],
        [46, [47]],
        [48, [50, 59, 64, 65, 67]],
        [49, [50, 51, 61, 65, 68]],
        [50, [51, 62, 65, 67]],
        [51, [62, 68]],
        [52, [53, 59, 63, 64, 66]],
        [53, [57, 63, 64]],
        [54, [55, 56, 57, 58]],
        [55, [56, 57, 64, 69]],
        [56, [69, 37, 38]],
        [57, [58, 64]],
        [58, []],
        [59, [61, 64, 65, 66]],
        [60, [62, 67]],
        [61, [65, 66]],
        [62, [67]],
        [63, []],
        [64, [20, 31, 69]],
        [65, []],
        [66, []],
        [67, []],
        [68, []],
        [69, [31, 37]]
    ];

    function setMarkers(map, locations) {
        // Add markers to the map

        for (var i = 0; i < locations.length; i++) {
            var location = locations[i];
            var myLatLng = new google.maps.LatLng(location[1], location[2]);
            var marker = new google.maps.Marker({
                position: myLatLng,
                map: map,
                icon: {
                    path: google.maps.SymbolPath.CIRCLE,
                    scale: 4,
                    strokeColor: '#808080'
                },
                title: location[0],
                zIndex: location[3]
            });
        }
    }

    function setTownLinks(map, locations, links) {
        var normalPolyOptions = {
            strokeColor: '#FF0000',
            strokeOpacity: 0.5,
            strokeWeight: 3,
            geodesic: true
        };

        var crossBorderPolyOptions = {
            strokeColor: '#000000',
            strokeOpacity: 0.5,
            strokeWeight: 3,
            geodesic: true
        };

        var networkLength = 0;
        var startPos;
        var endPos;

        for (var i = 0; i < links.length; i++) {
            var link = links[i];
            var linkStart = link[0] - 1;
            for (var n = 0; n < link[1].length; n++) {
                var linkEnd = link[1][n] - 1;
                startPos = new google.maps.LatLng(locations[linkStart][1], locations[linkStart][2]);
                endPos = new google.maps.LatLng(locations[linkEnd][1], locations[linkEnd][2]);
                var polyOptions;
                if (locations[linkStart][4] == locations[linkEnd][4]) {
                    polyOptions = normalPolyOptions;
                } else {
                    polyOptions = crossBorderPolyOptions;
                }
                var poly = new google.maps.Polyline(polyOptions);
                poly.setMap(map);
                var path = poly.getPath();
                path.push(startPos);
                path.push(endPos);
                networkLength += google.maps.geometry.spherical.computeDistanceBetween(startPos, endPos);
            }
        }
        document.getElementById('networkDistance').innerText = (networkLength / 1000) | 0;
    }

    //google.maps.event.addDomListener(window, 'load', initialize);
}]);
