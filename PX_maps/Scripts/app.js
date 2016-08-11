var menuVisualization = document.getElementById('pxm-sideMenu-visualization');
var menuMaps = document.getElementById('pxm-sideMenu-maps');

showVisualizationMenu.onclick = function () {
	classie.toggle(this, 'active');
	classie.toggle(menuVisualization, 'pxm-sideMenu-open');
	disableOther('showVisualizationMenu');
}

showMapsMenu.onclick = function () {
	classie.toggle(this, 'active');
	classie.toggle(menuMaps, 'pxm-sideMenu-open');
	disableOther('showMapsMenu');
}


function disableOther(btn) {
	if (btn !== 'showVisualizationMenu') {
		classie.toggle(showVisualizationMenu, 'disable');
	}
	if (btn !== 'showMapsMenu') {
		classie.toggle(showMapsMenu, 'disable');
	}
}