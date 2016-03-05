angular.module('belugabrain.ctc').controller('CtcTabsCtrl', ['$scope', '$http', 'CookieService', function ($scope, $window, CookieService) {
    $scope.CookieService = CookieService;
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

        var mapLatitude = $scope.CookieService.getCookie("mapLatitude");
        if (mapLatitude == "") {
            mapLatitude = 54.8;
        }
        var mapLongitude = $scope.CookieService.getCookie("mapLongitude");
        if (mapLongitude == "") {
            mapLongitude = -1.8;
        }
        var mapZoom = $scope.CookieService.getCookie("mapZoom");
        if (mapZoom == "") {
            mapZoom = 6;
        }

        $scope.map = new google.maps.Map(
            document.getElementById('map-canvas'),
            {
                center: new google.maps.LatLng(mapLatitude, mapLongitude),
                zoom: parseInt(mapZoom),
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
        google.maps.event.addListener(
            map,
            'zoom_changed',
            function () {
                $scope.CookieService.setCookie("mapZoom", map.getZoom());
            }
        );
        google.maps.event.addListener(
            map,
            'idle',
            function () {
                var mapCenter = map.getCenter();
                $scope.CookieService.setCookie("mapLatitude", mapCenter.lat());
                $scope.CookieService.setCookie("mapLongitude", mapCenter.lng());
            }
        );
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
        {Name: "Chichester", Lat: 50.832086, Lng: -0.781243, ZIndex: 1, CountryId: 1},
        {Name: "Newport", Lat: 50.700467, Lng: -1.290579, ZIndex: 1, CountryId: 1},
        {Name: "Winchester", Lat: 51.067097, Lng: -1.319593, ZIndex: 1, CountryId: 1},
        {Name: "Dorchester", Lat: 50.709254, Lng: -2.437557, ZIndex: 1, CountryId: 1},
        {Name: "Exeter", Lat: 50.729389, Lng: -3.543011, ZIndex: 1, CountryId: 1},
        {Name: "Truro", Lat: 50.263764, Lng: -5.064836, ZIndex: 1, CountryId: 1},
        {Name: "Taunton", Lat: 51.023677, Lng: -3.103583, ZIndex: 1, CountryId: 1},
        {Name: "Trowbridge", Lat: 51.319753, Lng: -2.214404, ZIndex: 1, CountryId: 1},
        {Name: "Bristol", Lat: 51.449146, Lng: -2.581558, ZIndex: 1, CountryId: 1},
        {Name: "Gloucester", Lat: 51.865356, Lng: -2.238828, ZIndex: 1, CountryId: 1},
        {Name: "Reading", Lat: 51.457994, Lng: -0.971695, ZIndex: 1, CountryId: 1},
        {Name: "Guildford", Lat: 51.236896, Lng: -0.580124, ZIndex: 1, CountryId: 1},
        {Name: "Maidstone", Lat: 51.277623, Lng: 0.521304, ZIndex: 1, CountryId: 1},
        {Name: "Lewes", Lat: 50.870620, Lng: 0.011106, ZIndex: 1, CountryId: 1},
        {Name: "London", Lat: 51.505100, Lng: -0.086869, ZIndex: 1, CountryId: 1},
        {Name: "Chelmsford", Lat: 51.736216, Lng: 0.468596, ZIndex: 1, CountryId: 1},
        {Name: "Hertford", Lat: 51.799000, Lng: -0.091610, ZIndex: 1, CountryId: 1},
        {Name: "Aylesbury", Lat: 51.814039, Lng: -0.815302, ZIndex: 1, CountryId: 1},
        {Name: "Oxford", Lat: 51.753461, Lng: -1.269647, ZIndex: 1, CountryId: 1},
        {Name: "Hereford", Lat: 52.061206, Lng: -2.708964, ZIndex: 1, CountryId: 1},
        {Name: "Worcester", Lat: 52.194532, Lng: -2.209502, ZIndex: 1, CountryId: 1},
        {Name: "Warwick", Lat: 52.286423, Lng: -1.582049, ZIndex: 1, CountryId: 1},
        {Name: "Northampton", Lat: 52.237258, Lng: -0.906592, ZIndex: 1, CountryId: 1},
        {Name: "Bedford", Lat: 52.136529, Lng: -0.479333, ZIndex: 1, CountryId: 1},
        {Name: "Cambridge", Lat: 52.194320, Lng: 0.136942, ZIndex: 1, CountryId: 1},
        {Name: "Ipswich", Lat: 52.050622, Lng: 1.145028, ZIndex: 1, CountryId: 1},
        {Name: "Norwich", Lat: 52.627165, Lng: 1.306535, ZIndex: 1, CountryId: 1},
        {Name: "Oakham", Lat: 52.671843, Lng: -0.734130, ZIndex: 1, CountryId: 1},
        {Name: "Leicester", Lat: 52.630736, Lng: -1.125003, ZIndex: 1, CountryId: 1},
        {Name: "Birmingham", Lat: 52.477390, Lng: -1.896747, ZIndex: 1, CountryId: 1},
        {Name: "Shrewsbury", Lat: 52.711651, Lng: -2.749810, ZIndex: 1, CountryId: 1},
        {Name: "Stafford", Lat: 52.803812, Lng: -2.121588, ZIndex: 1, CountryId: 1},
        {Name: "Derby", Lat: 52.916147, Lng: -1.463578, ZIndex: 1, CountryId: 1},
        {Name: "Nottingham", Lat: 52.947054, Lng: -1.147241, ZIndex: 1, CountryId: 1},
        {Name: "Lincoln", Lat: 53.226626, Lng: -0.539618, ZIndex: 1, CountryId: 1},
        {Name: "Sheffield", Lat: 53.378441, Lng: -1.463556, ZIndex: 1, CountryId: 1},
        {Name: "Chester", Lat: 53.196432, Lng: -2.880418, ZIndex: 1, CountryId: 1},
        {Name: "Liverpool", Lat: 53.406958, Lng: -2.978603, ZIndex: 1, CountryId: 1},
        {Name: "Manchester", Lat: 53.476385, Lng: -2.230383, ZIndex: 1, CountryId: 1},
        {Name: "Wakefield", Lat: 53.682698, Lng: -1.504520, ZIndex: 1, CountryId: 1},
        {Name: "Beverley", Lat: 53.842356, Lng: -0.423400, ZIndex: 1, CountryId: 1},
        {Name: "Northallerton", Lat: 54.332782, Lng: -1.440675, ZIndex: 1, CountryId: 1},
        {Name: "Lancaster", Lat: 54.048647, Lng: -2.808401, ZIndex: 1, CountryId: 1},
        {Name: "Carlisle", Lat: 54.890932, Lng: -2.932214, ZIndex: 1, CountryId: 1},
        {Name: "Morpeth", Lat: 55.162101, Lng: -1.682823, ZIndex: 1, CountryId: 1},
        {Name: "Newcastle", Lat: 54.969155, Lng: -1.617347, ZIndex: 1, CountryId: 1},
        {Name: "Durham", Lat: 54.779039, Lng: -1.581513, ZIndex: 1, CountryId: 1},
        {Name: "Ebbw Vale (Blaenau Gwent)", Lat: 51.757142, Lng: -3.196846, ZIndex: 1, CountryId: 2},
        {Name: "Bridgend (Bridgend)", Lat: 51.507086, Lng: -3.575664, ZIndex: 1, CountryId: 2},
        {Name: "Caerphilly (Caerphilly)", Lat: 51.571858, Lng: -3.218875, ZIndex: 1, CountryId: 2},
        {Name: "Cardiff (Cardiff)", Lat: 51.476206, Lng: -3.179565, ZIndex: 1, CountryId: 2},
        {Name: "Carmarthen (Carmarthenshire)", Lat: 51.853566, Lng: -4.305794, ZIndex: 1, CountryId: 2},
        {Name: "Aberaeron (Ceredigion)", Lat: 52.239754, Lng: -4.265315, ZIndex: 1, CountryId: 2},
        {Name: "Conwy (Conwy)", Lat: 53.280140, Lng: -3.829918, ZIndex: 1, CountryId: 2},
        {Name: "Ruthin (Denbighshire)", Lat: 53.114950, Lng: -3.309169, ZIndex: 1, CountryId: 2},
        {Name: "Mold (Flintshire)", Lat: 53.167444, Lng: -3.143304, ZIndex: 1, CountryId: 2},
        {Name: "Caernarfon (Gwynedd)", Lat: 53.140333, Lng: -4.276784, ZIndex: 1, CountryId: 2},
        {Name: "Llangefni (Isle of Anglesey)", Lat: 53.253365, Lng: -4.309810, ZIndex: 1, CountryId: 2},
        {Name: "Merthyr Tydfil", Lat: 51.744561, Lng: -3.377066, ZIndex: 1, CountryId: 2},
        {Name: "Monmouth (Monmouthshire)", Lat: 51.812025, Lng: -2.715701, ZIndex: 1, CountryId: 2},
        {Name: "Port Talbot (Neath Port Talbot)", Lat: 51.592084, Lng: -3.780747, ZIndex: 1, CountryId: 2},
        {Name: "NewPort (Newport)", Lat: 51.588300, Lng: -3.000131, ZIndex: 1, CountryId: 2},
        {Name: "Haverford West (Pembrokeshire)", Lat: 51.802549, Lng: -4.960836, ZIndex: 1, CountryId: 2},
        {Name: "Landrindod Wells (Powys)", Lat: 52.242081, Lng: -3.379012, ZIndex: 1, CountryId: 2},
        {Name: "Clydach Vale (Rhondda Cynon Taf)", Lat: 51.624334, Lng: -3.470327, ZIndex: 1, CountryId: 2},
        {Name: "Swansea (Swansea)", Lat: 51.625795, Lng: -3.941318, ZIndex: 1, CountryId: 2},
        {Name: "Pontypool (Torfaen)", Lat: 51.696869, Lng: -3.013803, ZIndex: 1, CountryId: 2},
        {Name: "Barry (Vale of Glamorgan)", Lat: 51.392141, Lng: -3.273904, ZIndex: 1, CountryId: 2},
        {Name: "Wrexham", Lat: 53.049887, Lng: -3.001323, ZIndex: 1, CountryId: 2},
        {Name: "Aberdeen (AberdeenShire)", Lat: 57.144356, Lng: -2.099309, ZIndex: 1, CountryId: 3},
        {Name: "Forfar (Angus)", Lat: 56.635020, Lng: -2.921564, ZIndex: 1, CountryId: 3},
        {Name: "Lochgilphead (Argyle and Bute)", Lat: 56.026213, Lng: -5.422444, ZIndex: 1, CountryId: 3},
        {Name: "Edinburgh", Lat: 55.951072, Lng: -3.191453, ZIndex: 1, CountryId: 3},
        {Name: "Alloa (Clackmannanshire)", Lat: 56.117793, Lng: -3.789445, ZIndex: 1, CountryId: 3},
        {Name: "Stornoway (Western Isles)", Lat: 58.208606, Lng: -6.379321, ZIndex: 1, CountryId: 3},
        {Name: "Dumfries (Dumfries and Galloway", Lat: 55.072156, Lng: -3.604727, ZIndex: 1, CountryId: 3},
        {Name: "Dundee", Lat: 56.457543, Lng: -2.969381, ZIndex: 1, CountryId: 3},
        {Name: "Kilmarnock (East Ayrshire)", Lat: 55.611953, Lng: -4.498405, ZIndex: 1, CountryId: 3},
        {Name: "Kirkintilloch (East Dunbartonshire)", Lat: 55.934619, Lng: -4.159395, ZIndex: 1, CountryId: 3},
        {Name: "Haddington (East Lothian)", Lat: 55.954510, Lng: -2.781348, ZIndex: 1, CountryId: 3},
        {Name: "Giffnock (East Renfrewshire)", Lat: 55.804016, Lng: -4.293281, ZIndex: 1, CountryId: 3},
        {Name: "Falkirk", Lat: 56.002749, Lng: -3.784910, ZIndex: 1, CountryId: 3},
        {Name: "Glenrothes (Fife)", Lat: 56.197683, Lng: -3.176695, ZIndex: 1, CountryId: 3},
        {Name: "Glasgow", Lat: 55.860553, Lng: -4.257785, ZIndex: 1, CountryId: 3},
        {Name: "Inverness (Highlands)", Lat: 57.479750, Lng: -4.222448, ZIndex: 1, CountryId: 3},
        {Name: "Greenock (Invercylde", Lat: 55.945952, Lng: -4.752774, ZIndex: 1, CountryId: 3},
        {Name: "Dalkeith (Midlothian", Lat: 55.892602, Lng: -3.070403, ZIndex: 1, CountryId: 3},
        {Name: "Elgin (Moray)", Lat: 57.643019, Lng: -3.311340, ZIndex: 1, CountryId: 3},
        {Name: "Irvine (North Ayrshire)", Lat: 55.611375, Lng: -4.674316, ZIndex: 1, CountryId: 3},
        {Name: "Motherwell (North Lanarkshire)", Lat: 55.791372, Lng: -3.993653, ZIndex: 1, CountryId: 3},
        {Name: "Kirkwall (Orkney Islands)", Lat: 58.980809, Lng: -2.956504, ZIndex: 1, CountryId: 3},
        {Name: "Perth (Perth and Kinross)", Lat: 56.392139, Lng: -3.438886, ZIndex: 1, CountryId: 3},
        {Name: "Paisley (Renfrewshire)", Lat: 55.847063, Lng: -4.423750, ZIndex: 1, CountryId: 3},
        {Name: "Newton St Boswells (Scottish Borders)", Lat: 55.577602, Lng: -2.673037, ZIndex: 1, CountryId: 3},
        {Name: "Lerwick (Shetlands)", Lat: 60.154283, Lng: -1.146738, ZIndex: 1, CountryId: 3},
        {Name: "Ayr (South Ayrshire)", Lat: 55.458149, Lng: -4.625201, ZIndex: 1, CountryId: 3},
        {Name: "Hamilton (South Lanarkshire)", Lat: 55.773346, Lng: -4.038703, ZIndex: 1, CountryId: 3},
        {Name: "Stirling (Stirling)", Lat: 56.1196735, Lng: -3.9359096, ZIndex: 1, CountryId: 3},
        {Name: "Dumbarton (West Dumbartonshire)", Lat: 55.9462834, Lng: -4.5683658, ZIndex: 1, CountryId: 3},
        {Name: "Livingstone (West Lothian)", Lat: 55.8718509, Lng: -3.5016145, ZIndex: 1, CountryId: 3}
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
        [44, [45, 46, 47, 76, 94]],
        [45, [46, 94]],
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
        [69, [31, 37]],
        [70, [71, 85, 88, 95]],
        [71, [77, 85, 92]],
        [72, [75, 85, 86]],
        [73, [80, 82, 83, 87, 100]],
        [74, [82, 83, 92, 98]],
        [75, [85, 91]],
        [76, [78, 87, 94, 96, 97, 100]],
        [77, [83, 92]],
        [78, [81, 89, 93, 96, 97]],
        [79, [82, 84, 90, 98, 99]],
        [80, [87, 94]],
        [81, [84, 93, 97]],
        [82, [83, 90, 98, 100]],
        [83, [92]],
        [84, [90, 93, 97, 99]],
        [85, [86, 88, 91, 92, 98]],
        [86, [89, 93, 99]],
        [87, [94, 100]],
        [88, [91, 95]],
        [89, [93, 96]],
        [90, [97, 100]],
        [91, [95]],
        [92, [98]],
        [93, [99]],
        [94, []],
        [95, []],
        [96, []],
        [97, []],
        [98, [99]],
        [99, []],
        [100, []]
    ];

    function setMarkers(map, locations) {
        // Add markers to the map

        for (var i = 0; i < locations.length; i++) {
            var location = locations[i];
            var myLatLng = new google.maps.LatLng(location.Lat, location.Lng);
            var marker = new google.maps.Marker({
                position: myLatLng,
                map: map,
                icon: {
                    path: google.maps.SymbolPath.CIRCLE,
                    scale: 4,
                    strokeColor: '#808080'
                },
                title: location.Name,
                zIndex: location.ZIndex
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
                var startLocation = locations[linkStart];
                var endLocation = locations[linkEnd];
                startPos = new google.maps.LatLng(startLocation.Lat, startLocation.Lng);
                endPos = new google.maps.LatLng(endLocation.Lat, endLocation.Lng);
                var polyOptions;
                if (startLocation.CountryId == endLocation.CountryId) {
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
        //crossBorderPolyOptions.strokeColor = '#00FF00';
    }

    //google.maps.event.addDomListener(window, 'load', initialize);
}]);
