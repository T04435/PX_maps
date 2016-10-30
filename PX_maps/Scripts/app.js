
// Array with HEX colors used for the traffic speed
const Colors = [
						"#7FB069", // LIGHT GREEN
						"#034732", // GREEN
						"#F9DC5C", // LIGHT YELLOW
						"#FF9505", // YELLOW
						"#EF6461", // LIGHT RED
						"#630A08"  // RED
];
// Array with RGBA colors used for the traffic speed AND allow transparency this are the same colors as before but with a 0.75 opacity
const ColorsTransparent = [
	"rgba(127,176,105,0.75)",
	"rgba(3,71,50,0.75)",
	"rgba(249,220,92,0.75)",
	"rgba(255,149,5,0.75)",
	"rgba(239,100,97,0.75)",
	"rgba(99,10,8,0.75)"
]

//Get the current application PATH DOMAIN.COM:PORT/PATHNAME
const path = window.location.pathname;
//Get the dashboard 
var dashboard = document.getElementById('dashboard');
//Get the application container from _Layout
var app = document.getElementById('app-container');
//Get (show/hide) text from _Dashboard
var dashboardControl = document.getElementById('dashboard-control');
///Get map control section from _Dashboard
var mapControl = document.getElementById('map-controls');
///Get graph control section from _Dashboard
var graphControl = document.getElementById('graph-controls');
///Get input select for week days from _Dashboard
var daySelect = document.getElementById('week-day');
///Get input range for day hour from _Dashboard
var timeSelect = document.getElementById('hour-selector');



//Running an anonymous function on Window Load to only show the sections we need for current PATHNAME
window.onload = function () {
	hideAllControls();
	//Based on PATHNAME show correnponding elements
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
	}
	if (dashboardControl.innerHTML === 'hide') {
		dashboardControl.innerHTML = 'show';
	} else {
		dashboardControl.innerHTML = 'hide';
	}
}


/*
 * Hide all main elements in the Dashboard
 */
function hideAllControls() {
	classie.add(timeSelect, 'kfc-hidden');
	classie.add(daySelect, 'kfc-hidden');
	classie.add(mapControl, 'kfc-hidden');
	classie.add(graphControl, 'kfc-hidden');
}


function fillBox(hour) {
	document.getElementById("hour-range-value").value = hour + ":00";
}

/* HELPERS */
function hasClass(elem, cls) {
	return (" " + elem.className + " ").indexOf(" " + cls + " ") > -1;
}

/*
 * returns a colour base on a *speed*
 */
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

/*
 * returns a transparent colour base on a *speed*
 */
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
