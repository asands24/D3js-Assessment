// Basic parameters of the svg
var margin = {
  top: 15,
  bottom: 15,
  left: 70,
  right: 15
};

var width = 900;
var height = 600;

var svgHeight = height + margin.top + margin.bottom;
var svgWidth = width + margin.left + margin.right;

var svg = d3.select('#svg-area')
            .append('svg')
            .attr('width', svgWidth)
            .attr('height', svgHeight);

var tooltip = d3.select('body')
                .append('div')
                .attr('class', 'tooltip')
                .attr('opacity', '0');

// Read and arrange the data
d3.json("./data/data.json", function(data) {
    console.log(data);
});


// Set scales
const xScale = d3.scaleBand().rangeRound([0, 250]).padding(0.1);
const yScale = d3.scaleLinear().domain([0, 100]).range([200, 0]);

var scale = d3.scaleLinear()
            .domain([0, 1000])
            .range([50, 500]);


// Create axes
var x_axis = d3.axisBottom()
                   .scale(scale);



// Append the axes as G


// Create Bars or Line function
// const bars = container
//   .selectAll('.bar')
//   .data(data.json)
//   .enter()
//   .append('rect')
//   .classed('bar', true)
//   .attr('width', xScale.bandwidth())
//   .attr('height', (data) => yScale(data.value));


// Create Circle group




// Mouseover / mouseout



// tooltip



// Legend function
