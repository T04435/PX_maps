
/*
 * SideMenu CSS clases toggled to control
 * show/hide
 * active/disable
 */


var menuVisualization = document.getElementById('pxm-sideMenu-visualization');
var menuMaps = document.getElementById('pxm-sideMenu-maps');
var triggerMenuVisualization = document.getElementById('showVisualizationMenu');
var triggerMenuMaps = document.getElementById('showMapsMenu');

showVisualizationMenu.onclick = function () {
	classie.toggle(this, 'active');
	classie.toggle(menuVisualization, 'pxm-sideMenu-open');
	classie.toggle(triggerMenuMaps, 'fa-map');
	classie.toggle(triggerMenuMaps, 'fa-ban');
	disableOther('showVisualizationMenu');
}

showMapsMenu.onclick = function () {
	classie.toggle(this, 'active');
	classie.toggle(menuMaps, 'pxm-sideMenu-open');
	classie.toggle(triggerMenuVisualization, 'fa-area-chart');
	classie.toggle(triggerMenuVisualization, 'fa-ban');
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



/*
 * 3DJS code from here down will only be used for 3DJS
 */

//data set for 3D
var dataset = [];
//add random data to the dataset
for (var i = 0; i < 30; i++) {
	dataset.push(Math.random() * 50);
}

//selecting body
var main = d3.select("#D3ChartBar");
//appending to body
var bars = main.selectAll("div");
var enteredData = bars.data(dataset).enter();
var char = enteredData.append("div").attr("class", "D3bar");
char.style("height", function (d) {
	return d * 5 + "px";
});

