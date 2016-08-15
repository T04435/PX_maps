

function clearD3(){
	document.getElementById('showVisualizationMenu').click();
	let D3Charts = document.querySelectorAll('[id^="D3"]');

	for (var i = 0; i < D3Charts.length; i++) {
		D3Charts[i].innerHTML = "";
	}

}
function barChart() {


/*
 * 3DJS code from here down will only be used for 3DJS
 */
//Initial empty array which will hold values for the bars
var dataset = [];
// month min val
var min = 28;
// month min val
var max = 31;
// Randomnly selecting a month max Days
var monthDays = Math.floor(Math.random() * (max - min + 1)) + min;
// Filling data array with random values in range (0-50)
for (var i = 0; i < monthDays; i++) {
	dataset.push(Math.ceil(Math.random() * 200));
}
// Selecting & reseting D3 main container
var D3Container = d3.select("#D3");
//appending SVG to main container
var w = 35 * dataset.length;
var h = Math.max.apply(null,dataset) + 25;

D3Container.append('h3').text('month bar chart');

var barPadding = 2;
var SVG = D3Container.append("svg")
.attr("width", "100%")
.attr("height", h);





SVG.selectAll("rect")
	.data(dataset)
	.enter()
	.append("rect")
	.attr("x", 0)
	.transition()
	.attr("x", function (d, i) {
		return i * (w / dataset.length)
	})
	.attr("y", function (d) {
		return h - d;
	})
	.attr("width", w / dataset.length - barPadding)
	.attr("height", function (d) {
		return d;
	})
	.attr("class", "D3bar");


SVG.selectAll("text")
	.data(dataset)
	.enter()
	.append("text")
	.text(function (d,i) {
		return i +  1;
	})
	.attr("x", function (d, i) {
		return i * (w / dataset.length) + 8
	})
	.attr("y", h + 16)
	;
	
}