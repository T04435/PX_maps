

function clearD3() {
	let D3Charts = document.querySelectorAll('[id^="D3"]');

	for (var i = 0; i < D3Charts.length; i++) {
		D3Charts[i].innerHTML = "";
	}

}

function donutChart() {
	const dataset = [
			{ label: 'Toyota', count: 50 },
			{ label: 'Fiat', count: 120 },
			{ label: 'Volvo', count: 45 },
			{ label: 'Ford', count: 67 },
			{ label: 'Honda', count: 37 },
			{ label: 'Lexus', count: 28 },
			{ label: 'Tesla', count: 99 },
	];

	const width = 300;
	const height = 300;
	const radius = Math.min(width, height) / 2;
	const donutWidth = 100;
	const color = d3.scaleOrdinal(d3.schemeCategory20b);
	const legendSize = 20;
	const legendPadding = 4;


	let D3SVG = d3.select('#D3')
		.append('svg')
		.attr('width', width)
		.attr('height', height)
		.append('g')
		.attr('transform', 'translate(' + (width / 2) + ',' + (height / 2) + ')');


	let arc = d3.arc()
		.innerRadius(radius - donutWidth)
		.outerRadius(radius);

	let pie = d3.pie()
		.value(function (d) {
			return d.count;
		})
		.sort(null);

	let path = D3SVG.selectAll('path')
		.data(pie(dataset))
		.enter()
		.append('path')
		.attr('d', arc)
		.attr('fill', function (d, i) {
			return color(d.data.label);
		});

	let legend = D3SVG.selectAll('.legend')
		.data(color.domain())
		.enter()
		.append('g')
		.classed('legend', true)
		.attr('transform', function (d, i) {
			let height = legendSize + legendPadding;
			let horz, vert;
			if (i < dataset.length / 2) {
				horz = -width / 2;
				vert = width / 2 + i * height;
			} else {
				horz = 0;
				vert = width / 2 + (dataset.length - i ) * height;
			}


			return 'translate(' + horz + ',' + vert + ')';
		});

	legend.append('rect')
		.attr('width', legendSize)
		.attr('height', legendSize)
		.style('fill', color)
		.style('stroke', color);

	legend.append('text')
		.attr('x', legendSize + legendPadding)
		.attr('y', legendSize - legendPadding)
		.text(function (d) {
			return d;
		});









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
	var h = Math.max.apply(null, dataset) + 25;

	D3Container.append('h3').text('month bar chart');

	var barPadding = 2;
	var SVG = D3Container.append("svg")
	.attr("width", "100%")
	.attr("height", h)
	.classed('barChart', true);



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
		.text(function (d, i) {
			return i + 1;
		})
		.attr("x", function (d, i) {
			return i * (w / dataset.length) + 8
		})
		.attr("y", h + 16)
	;

}