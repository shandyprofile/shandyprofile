

// Modal Image Gallery
function onClick(element) {
    document.getElementById("img01").src = element.src;
    document.getElementById("modal01").style.display = "block";
    var captionText = document.getElementById("caption");
    captionText.innerHTML = element.alt;
}

// Change style of navbar on scroll
window.onscroll = function () { myFunction() };
function myFunction() {
    var navbar = document.getElementById("myNavbar");
    if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
        navbar.className = "w3-bar" + " w3-card" + " w3-animate-top" + " w3-white";
    } else {
        navbar.className = navbar.className.replace(" w3-card w3-animate-top w3-white", "");
    }
}

// Used to toggle the menu on small screens when clicking on the menu button
function toggleFunction() {
    var x = document.getElementById("navDemo");
    if (x.className.indexOf("w3-show") == -1) {
        x.className += " w3-show";
    } else {
        x.className = x.className.replace(" w3-show", "");
    }
}







function ConvertData(titleName, apexName, apexdata) {
    var newSeries = {
        className: titleName,
        axes: []
    };

    for (let i = 0; i < apexdata.length; i++) {
        newSeries.axes.push({ "axis": [apexName[i]], "value": parseFloat(apexdata[i]) })
    }
    return newSeries;
}

function showRadar(_idChart,_titleName, _headerChar,_dataChar, _size) {

    var data = [];
    var chart = RadarChart.chart();

    data.push(ConvertData(_titleName, _headerChar, _dataChar));

    RadarChart.defaultConfig.radius = 3;
    RadarChart.defaultConfig.w = _size;
    RadarChart.defaultConfig.h = _size;
    RadarChart.defaultConfig.levels = 5;
    RadarChart.draw(_idChart, data);

    function animate(elem, time) {
        if (!elem) return;
        var to = elem.offsetTop;
        var from = window.scrollY;
        var start = new Date().getTime(),
            timer = setInterval(function () {
                var step = Math.min(1, (new Date().getTime() - start) / time);
                window.scrollTo(0, (from + step * (to - from)) + 1);
                if (step == 1) { clearInterval(timer); };
            }, 25);
        window.scrollTo(0, (from + 1));
    }
    animate($(_idChart), 600);
}

$(document).ready(function () {
    //showRadar("#ChartData", _websiteName, _websiteData);
    CreateSkillityMenu();
});

var _websiteName = ["NodeJS", "AngularJS", "Css/Scss/Sass", "Javascript"];
var _websiteData = ["8", "6", "10", "10"];

var _applicationName = ["C", ".Net", "Java", "Python"];
var _applicationData = ["7", "10", "2", "6"];

var _databaseName = ["MongoDB", "MySQL", "SQL Server", "Oracle"];
var _databaseData = ["8", "10", "9", "6"];

var _chipsetName = ["HSP", "ARM", "FPGA"];
var _chipsetData = ["4", "10", "3"];

function CreateSkillityMenu() {
    let menuNames = ["Website", "Application", "Database", "Chipset"];
    let menuIcon = ["fa-laptop", "fa-laptop", "fa-database","fa-microchip"];
    let menuLenght = menuNames.length;

    let skillityMenu = $("#Skillity-menu");

    let size = 600 / menuLenght - 15 * menuLenght;
    for (var i = 0; i < menuLenght; i++) {
        skillityMenu.append(
            $("<div>", {
                "class": "w3-center w3-wide w3-col s12 m" + (12 / menuLenght)
            }).data("item", i)
                .append(
                $("<div>").addClass("w3-dark-grey").append($("<i>").addClass("w3-dark-grey fa " + menuIcon[i]).text(menuNames[i])),
                $("<div>").addClass("w3-light-grey").attr("id", "radar-chart-" + i)
            )
        )

        let apexName = GetApexName(i);
        let apexData = GetApexData(i);

        showRadar("#radar-chart-" + i, menuNames[i], apexName, apexData, size )
    }
}

function GetApexName(i) {
    switch (i) {
        case 0:
            return _websiteName;
        case 1:
            return _applicationName;
        case 2:
            return _databaseName;
        case 3:
            return _chipsetName;
        default:
            return null;
    }
}

function GetApexData(i) {
    switch (i) {
        case 0:
            return _websiteData;
        case 1:
            return _applicationData;
        case 2:
            return _databaseData;
        case 3:
            return _chipsetData;
        default:
            return null;
    }
}
