
/*
 * SideMenu CSS clases toggled to control
 * show/hide
 * active/disable
 */


var menuVisualization = document.getElementById('pxm-sideMenu-visualization');
var menuMaps = document.getElementById('pxm-sideMenu-maps');
var triggerMenuVisualization = document.getElementById('showVisualizationMenu');
var triggerMenuMaps = document.getElementById('showMapsMenu');

//showVisualizationMenu.onclick = function () {
//	classie.toggle(this, 'active');
//	classie.toggle(menuVisualization, 'pxm-sideMenu-open');
//	classie.toggle(triggerMenuMaps, 'fa-map');
//	classie.toggle(triggerMenuMaps, 'fa-ban');
//	disableOther('showVisualizationMenu');
//}

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



