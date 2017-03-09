(function() {

	
	const margin = {
		top: 10,
		right: 30,
		bottom: 30,
		left: 30
	},
		  width = window.innerWidth - margin.left - margin.right,
		  height = window.innerHeight - margin.top - margin.bottom;

	let svg = d3.select("#place").append("svg")
		.attr('width', width)
		.attr('height', height)



	// First we append a 'defs' element, which
	// allows us to define some svg without actually
	// rendering it. This lets us use it later
	svg.append("defs").selectAll("linearGradient")
		.data([/* Some data here */])
	  .enter().append("linearGradient")
		.attr('id', d => "tc-"+d.TESTCENTERID ) // I assign an id to the gradient for easy reference later
		.attr('x1', "0%")
		.attr('x2', "0%")
		.attr('y1', "100%")
		.attr('y2', "0%")
	  .append('stop')      // 
		.attr('offset', d => 100*(+d.events[0].ASSIGNED / +d.events[0].CAPACITY)+"%")
		.attr('stop-color', "#e44")
		.attr('stop-opacity', 1)

	// We need to have two stop tags appened as children to the 
	d3.selectAll("linearGradient")
	  .append('stop')
		.attr('offset', "0%")
		.attr('stop-color', "transparent")
		.attr('stop-opacity', 0.5)

	svg.append('g')
		.attr('class', 'test-centers')
  	  .selectAll('circle')
		.data(test_centers)
	  .enter().append('circle')
		.attr('id', d => d.TESTCENTERID )
		.attr('r', d => scale(+d.events[0].CAPACITY) )
		.attr('transform', d => 'translate(' + projection([+d.LONGITUDE, +d.LATITUDE]) + ')')
				 		// here is where we call our custom made glyph and attach it to the appropriate circle
		.style('fill', d => 'url(#tc-'+d.TESTCENTERID+')') //
		.style("fill-opacity", 1)
		.style('stroke', '#000')

	
	
})()