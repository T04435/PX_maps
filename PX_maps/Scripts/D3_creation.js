
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
	D3Container.select("svg").remove();												// removes all svg tags
	D3Container.selectAll("h3").remove();											// removes all h3 tags
	D3Container.selectAll("p").remove();											// removes all p tags

	//Adding hearders
	D3Container.select("h1")																	// select the h1 on the page
		.attr("class", "D3graphHeader");												// add class

	D3Container.append('h3')																	// add h3 to main container
		.text($("#week-day").val() + ' bar chart')							// set h3 content to "weekday(from select in dashboard) bar chart"
		.attr("class", "D3graphSubHeader");											// add class

	//Adding maximun and minimun speeds.
	D3Container.append('p')																		// add a p tag to main container
		.html("Max Speed: <span>" + maxSpeed + " km/h</span>")  // add html content to p maximun speed
		.attr("class", "D3graphMaxSpeed");											// add class

	D3Container.append('p')																		// add a p tag to main container
		.html("Min Speed: <span>" + minSpeed + " km/h</span>")  // add html content to p minimun speed
		.attr("class", "D3graphMinSpeed");											// add class

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
			.attr("y", function (d) {																// set Y position of the rect to be on the oposite side. remove (h -) from the equation to get it.
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
	//In order to add two text values for the same element we have to diferentiate them
	//by using a class text.class1 and text.class1
	SVG.selectAll("text.speed")																	
	.data(dailySpeed)
	.enter()
			.append("text")																					// Add text containing speed value
			.text(function (d) {																		// 'd' stores speed value
				return d;
			})
			.attr("text-anchor", "start")														// setting the text to the start of the element
	.attr("x", function (d, i) {
		return i * (w / dailySpeed.length) + barPadding;					// X positioning of the speed value in the middle of the bar.
	})
	.attr("y", function (d) {
		return h - d * 10 + 24;																		// Y positioning of the speed value under the top edge of the bar by 24 offset.
	})
.attr("class", "D3barSpeed");																	// adding css class for extra styles

	SVG.selectAll("text.hour")
	.data(dailySpeed)
	.enter()
			.append("text")																					// Add text containing hour value
			.text(function (d, i) {																	// 'i' is an iterator so is used to count 0,1,2,3,4,...,23
				return i;
			})
			.attr("text-anchor", "start")														// setting the text to the start of the element
	.attr("x", function (d, i) {
		return i * (w / dailySpeed.length) + 8										// X positioning of the hour in the middle of the bar.
	})
	.attr("y", h + 16)
.attr("class", "D3barHour");																	// Y positioning of the speed value under the bottom edge of the bar by 8 offset.		

}