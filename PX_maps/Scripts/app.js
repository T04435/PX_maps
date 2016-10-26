//http://code.jquery.com/jquery-1.11.1.min.js add Jquery to bundle.
/*
 * SideMenu CSS clases toggled to control
 * show/hide
 * active/disable
 */

const Colors = [
						"#7FB069", // LIGHT GREEN
						"#034732", // GREEN
						"#F9DC5C", // LIGHT YELLOW
						"#FF9505", // YELLOW
						"#EF6461", // LIGHT RED
						"#630A08"  // RED
];

const ColorsTransparent = [
	"rgba(127,176,105,0.75)",
	"rgba(3,71,50,0.75)",
	"rgba(249,220,92,0.75)",
	"rgba(255,149,5,0.75)",
	"rgba(239,100,97,0.75)",
	"rgba(99,10,8,0.75)"
]

const path = window.location.pathname;
var app = document.getElementById('app-container');
var dashboardControl = document.getElementById('dashboard-control');
var dashboard = document.getElementById('dashboard');
var mapControl = document.getElementById('map-controls');
var graphControl = document.getElementById('graph-controls');
var trafficBtn = document.getElementById('get-traffic-btn');
var daySelect = document.getElementById('week-day');
var timeSelect = document.getElementById('hour-selector');



function redirectPath(ActualPath, nextPath) {
	if (ActualPath !== nextPath) {
		window.location = '..' + nextPath;
	}
}



window.onload = function () {
	console.log(path);


	hideAllControls();
	switch (path) {
		case '/Map/Index':
			classie.remove(mapControl, 'kfc-hidden');
			classie.remove(timeSelect, 'kfc-hidden');
			classie.remove(daySelect, 'kfc-hidden');
			break;
		case '/Graph/Index':
			classie.remove(graphControl, 'kfc-hidden');
			classie.remove(daySelect, 'kfc-hidden');

			break;
		case '/Home/About':
			dashboardControl.click();
		default:

	}
}

function hideDashOnClick() {
	dashboardControl.click();
}

dashboardControl.onclick = function () {
	classie.toggle(dashboard, 'dashboard-close');
	classie.toggle(app, 'fullscreen');
	switch (path) {
		case '/Home/About':
			let staffs = document.getElementsByClassName('staff');
			Array.prototype.forEach.call(staffs, function (staff) {
				classie.toggle(staff, 'fullscreen');
			});
			break;
		case 'Map/Index':
			break;
		default:
			console.log('Enjoy Your Live');
	}
	if (dashboardControl.innerHTML === 'hide') {
		dashboardControl.innerHTML = 'show';
	} else {
		dashboardControl.innerHTML = 'hide';
	}
}



function hideAllControls() {
	classie.add(timeSelect, 'kfc-hidden');
	classie.add(daySelect, 'kfc-hidden');
	classie.add(mapControl, 'kfc-hidden');
	classie.add(graphControl, 'kfc-hidden');
}

function disableOther(btn) {
	if (btn !== 'showVisualizationMenu') {
		classie.toggle(showVisualizationMenu, 'disable');
	}
	if (btn !== 'showMapsMenu') {
		classie.toggle(showMapsMenu, 'disable');
	}
}

function fillBox(hour) {
	document.getElementById("hour-range-value").value = hour + ":00";
	//console.log(hour + day);
}

/* HELPERS */
function hasClass(elem, cls) {
	return (" " + elem.className + " ").indexOf(" " + cls + " ") > -1;
}

//returns a colour base on a *speed*
function selectColor(speed) {
	var colour;
	if (speed <= 10) {
		colour = Colors[5];
	} else if (speed <= 15) {
		colour = Colors[4];
	} else if (speed <= 20) {
		colour = Colors[3];
	} else if (speed <= 30) {
		colour = Colors[2];
	} else if (speed <= 45) {
		colour = Colors[1];
	} else {
		colour = Colors[0];
	}
	return colour;
}
//returns a colour base on a *speed*
function selectColorTrans(speed) {
	var colour;
	if (speed <= 10) {
		colour = ColorsTransparent[5];
	} else if (speed <= 15) {
		colour = ColorsTransparent[4];
	} else if (speed <= 20) {
		colour = ColorsTransparent[3];
	} else if (speed <= 30) {
		colour = ColorsTransparent[2];
	} else if (speed <= 45) {
		colour = ColorsTransparent[1];
	} else {
		colour = ColorsTransparent[0];
	}
	return colour;
}
