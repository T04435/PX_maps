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
						"#630A08",  // RED
					  "#EC0868" // ZERO

];

const path = window.location.pathname;
var app = document.getElementById('app-container');
var dashboardControl = document.getElementById('dashboard-control');
var dashboard = document.getElementById('dashboard');
var mapControl = document.getElementById('map-controls');
var graphControl = document.getElementById('graph-controls');
var trafficBtn = document.getElementById('get-traffic-btn');



function redirectPath(ActualPath, nextPath) {
	if (ActualPath !== nextPath) {
		window.location = '..' + nextPath;
	}
}



window.onload = function () {
	console.log(path);
	if (path.indexOf("/Map/") === -1) {
		classie.add(mapControl, 'kfc-hidden');
	} else {
		classie.remove(mapControl, 'kfc-hidden');
	}
	if (path.indexOf("/Graph/") === -1) {
		classie.add(graphControl, 'kfc-hidden');
	} else {
		classie.remove(graphControl, 'kfc-hidden');
	}
	switch (path) {
		case '/Map/Index':
			break;
		case '/Home/About':
			dashboardControl.click();
			break;
		default:
			console.log('Enjoy Your Live');

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



//showMapsMenu.onclick = function () {
//	classie.toggle(this, 'active');
//	classie.toggle(menuMaps, 'pxm-sideMenu-open');
//	classie.toggle(triggerMenuVisualization, 'fa-area-chart');
//	classie.toggle(triggerMenuVisualization, 'fa-ban');
//	disableOther('showMapsMenu');
//}


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

