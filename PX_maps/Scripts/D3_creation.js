function clearD3() {
	let D3Charts = document.querySelectorAll('[id^="D3"]');

	for (var i = 0; i < D3Charts.length; i++) {
		D3Charts[i].innerHTML = "";
	}

}

function barChart(dailySpeed) {
	//appending SVG to main container
	var w = 35 * dailySpeed.length;
	var h = Math.max.apply(null, dailySpeed) + 25;
	var maxSpeed = Math.max.apply(null, dailySpeed);
	var minSpeed = Math.min.apply(null, dailySpeed);

	// Selecting & reseting D3 main container
	var D3Container = d3.select("#D3dailyAVGSpeedGraph");
	D3Container.select("svg").remove();
	D3Container.selectAll("h3").remove();
	D3Container.selectAll("h5").remove();
	D3Container.select("h1").attr("class", "D3graphHeader")
	D3Container.append('h3').text($("#week-day").val() + ' bar chart').attr("class", "D3graphSubHeader");
	D3Container.append('p').html("Max Speed: <span>" + maxSpeed + "</span>").attr("class", "D3graphMaxSpeed");
	D3Container.append('p').html("Min Speed: <span>" + minSpeed + "</span>").attr("class", "D3graphMinSpeed");

	var barPadding = 4;
	var SVG = D3Container.append("svg")
	.attr("width", "100%")
	.attr("height", h)
	.classed('D3barChart', true);



	SVG.selectAll("rect")
			.data(dailySpeed)
			.enter()
			.append("rect")
			.attr("x", 0)
			.transition()
			.attr("x", function (d, i) {
				return i * (w / dailySpeed.length)
			})
			.attr("y", function (d) {
				return h - d * 10;
			})
			.attr("fill", function (d) {
				if (d === maxSpeed) {
					return 'rgba(127, 176, 105, 1)';
				}
				if (d === minSpeed) {
					return 'rgba(239, 100, 97, 1)';
				}
				return 'rgba(249, 220, 92, 1)';
			})
			.attr("width", w / dailySpeed.length - barPadding)
			.attr("height", function (d) {
				return d * 10;
			})
			.attr("rx", "5")
			.attr("class", "D3bar");

	SVG.selectAll("text.speed")
	.data(dailySpeed)
	.enter()
			.append("text")
			.text(function (d) {
				return d;
			})
			.attr("text-anchor", "start")
	.attr("x", function (d, i) {
		return i * (w / dailySpeed.length) + 4
	})
	.attr("y", function (d) {
		return h - d * 10 + 24;
	})
.attr("class", "D3barSpeed");

	SVG.selectAll("text.hour")
	.data(dailySpeed)
	.enter()
			.append("text")
			.text(function (d, i) {
				return i;
			})
			.attr("text-anchor", "start")
	.attr("x", function (d, i) {
		return i * (w / dailySpeed.length) + 8
	})
	.attr("y", h + 16)
.attr("class", "D3barHour");

}