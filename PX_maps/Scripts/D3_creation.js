
/*
 * This function is used to clear all the D3 chart.
 * It will select all elements with IDs starting with "D3"
 * And clear all the elements inside of them.
 */

function clearD3() {
	//Select all the elements with IDs starting with "D3"
	let D3Charts = document.querySelectorAll('[id^="D3"]');
	//Clear all the elements inside.
	for (var i = 0; i < D3Charts.length; i++) {
		D3Charts[i].innerHTML = "";
	}

}


/*
 * This function creates the daily average speed Chart
 * by doing use of the D3 library
 */

function barChart(dailySpeed) {
	//Individual Bar Chart width
	const barW = 35;
	//Calculating Chart width 
	var w = barW * dailySpeed.length;
	//Calculating Chart height by geeting the max value on the data and adding 'barW' for extra padding
	var h = Math.max.apply(null, dailySpeed) + barW;
	//Calculating data max speed
	var maxSpeed = Math.max.apply(null, dailySpeed);
	//Calculating data min speed
	var minSpeed = Math.min.apply(null, dailySpeed);
	//Padding bewteen the Chart bars.
	var barPadding = 4;


	//Selecting & reseting D3 main container
	var D3Container = d3.select("#D3dailyAVGSpeedGraph");
	D3Container.select("svg").remove();
	D3Container.selectAll("h3").remove();
	D3Container.selectAll("h5").remove();
	D3Container.selectAll("p").remove();

	//Adding hearders
	D3Container.select("h1").attr("class", "D3graphHeader")
	D3Container.append('h3').text($("#week-day").val() + ' bar chart').attr("class", "D3graphSubHeader");

	//Adding maximun and minimun speeds.
	D3Container.append('p').html("Max Speed: <span>" + maxSpeed + " km/h</span>").attr("class", "D3graphMaxSpeed");
	D3Container.append('p').html("Min Speed: <span>" + minSpeed + " km/h</span>").attr("class", "D3graphMinSpeed");

	//Adding the Axis for the Graph
	D3Container.append('p').html("Average Speed(km/h)").attr("class", "D3YAxis");
	D3Container.append('p').html("Time of Day(24 h)").attr("class", "D3XAxis");

	//Adding svg to main container
	var SVG = D3Container.append("svg")
	.attr("width", "100%")
	.attr("height", h)
	.classed('D3barChart', true);


	//Adding one rect to the SVG for each data field found in the data set.
	SVG.selectAll("rect")	
			.data(dailySpeed)																				// data to be read
			.enter()																								// enter data
			.append("rect")																					// add rect to play as a Bar
			.attr("x", 0)																						// set X initial position to 0
			.transition()																						// will have a trasition from intial position to next set position
			.attr("x", function (d, i) {														// set X final position to perform transition
				return i * (w / dailySpeed.length)										// i is an iterator as a for loop so it will increment the offset (w / dailySpeed.length) as it increases.
			})
			.attr("y", function (d) {																// set Y position of the rect to be on the oposite side 
				return h - d * 10;
			})
			.attr("fill", function (d) {														// fill the rect 
				if (d === maxSpeed) {																	// fill green for max speed
					return 'rgba(127, 176, 105, 1)';
				}
				if (d === minSpeed) {																	// fill red for min speed
					return 'rgba(239, 100, 97, 1)';
				}
				return 'rgba(249, 220, 92, 1)';												// fill yellow for all other speeds
			})
			.attr("width", w / dailySpeed.length - barPadding)      // set with for the rect
			.attr("height", function (d) {
				return d * 10;																				// *10 to scale the size(height)
			})
			.attr("rx", "5")
			.attr("class", "D3bar");																// adding css class for extra styles


	//Adding text for speed and hour to the SVG for each data field found in the data set.
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